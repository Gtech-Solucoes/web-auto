"use server";

import { fetchApi } from "./api";

export type Vehicle = {
  id: string;
  type: "CARRO" | "MOTO";
  primaryImage: string;
  images: string[];
  brand: string;
  model: string;
  version?: string;
  year: number;
  description: string;
  price: number;
  modelYear: number;
  about?: string;
  itens: string[];
  km: number;
  body: string;
  color: string;
  fuel: "FLEX" | "GASOLINA" | "ETANOL" | "DIESEL";
  exchange: "AUTOMÁTICO" | "SEMI-AUTOMÁTICO" | "MANUAL";
  singleOwner: boolean;
  paidIPVA: boolean;
  licensed: boolean;
  width: string;
  height: string;
  weight: string;
  tank: string;
  length: string;
  wheelbase: string;
  occupants: string;
  trunk: string;
  accessCount?: number;
  status: string;
  homePage?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export const getHomePageVehicles = async (): Promise<Partial<Vehicle>[]> => {
  const response = await fetchApi(`/public/vehicles/home?limit=8`);

  if (!response.ok) {
    throw new Error("Error fetching home page vehicles");
  }

  return (await response.json()) as Partial<Vehicle>[];
};

export type GetVehiclesInput = {
  type?: string;
  model?: string;
  brand?: string;
  year?: number;
  page: number;
  sort?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type GetVehiclesOutput = {
  meta: {
    totalRows: number;
    totalPages: number;
  };
  records: Partial<Vehicle>[];
};

const PAGE_SIZE = 16;

const normalizeSearchParam = (value?: string | string[]) => {
  if (!value) return undefined;
  return Array.isArray(value) ? value[0] : value;
};

const appendParam = (
  params: URLSearchParams,
  key: string,
  value?: string | number,
) => {
  if (value === undefined || value === null || value === "") return;
  params.set(key, String(value));
};

export const getVehicles = async ({
  type,
  model,
  brand,
  year,
  page,
  searchParams,
  sort,
}: GetVehiclesInput): Promise<GetVehiclesOutput> => {
  try {
    const params = new URLSearchParams();
    const pageNumber = Number.isFinite(page) && page > 0 ? page : 1;

    params.set("page", String(pageNumber));
    params.set("limit", String(PAGE_SIZE));

    appendParam(params, "type", type);
    appendParam(params, "brand", brand);
    appendParam(params, "model", model);
    if (Number.isFinite(year)) {
      appendParam(params, "year", year as number);
    }
    appendParam(params, "sort", sort);

    const search = normalizeSearchParam(searchParams?.search);
    if (search) {
      appendParam(params, "search", search.trim());
    }

    appendParam(params, "yearGte", normalizeSearchParam(searchParams?.yearGte));
    appendParam(params, "yearLte", normalizeSearchParam(searchParams?.yearLte));
    appendParam(
      params,
      "priceGte",
      normalizeSearchParam(searchParams?.priceGte),
    );
    appendParam(
      params,
      "priceLte",
      normalizeSearchParam(searchParams?.priceLte),
    );
    appendParam(params, "kmGte", normalizeSearchParam(searchParams?.kmGte));
    appendParam(params, "kmLte", normalizeSearchParam(searchParams?.kmLte));
    appendParam(
      params,
      "exchange",
      normalizeSearchParam(searchParams?.exchange),
    );

    const response = await fetchApi(`/public/vehicles?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Error fetching vehicles");
    }

    return (await response.json()) as GetVehiclesOutput;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw new Error("Error fetching vehicles");
  }
};

type VehicleResponse = Omit<Vehicle, "createdAt" | "updatedAt"> & {
  createdAt?: string;
  updatedAt?: string;
};

export const getVehicleById = async (id: string): Promise<Vehicle | null> => {
  const response = await fetchApi(`/public/vehicles/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Error fetching vehicle by id");
  }

  const vehicle = (await response.json()) as VehicleResponse;

  return {
    ...vehicle,
    createdAt: vehicle.createdAt ? new Date(vehicle.createdAt) : undefined,
    updatedAt: vehicle.updatedAt ? new Date(vehicle.updatedAt) : undefined,
  };
};
