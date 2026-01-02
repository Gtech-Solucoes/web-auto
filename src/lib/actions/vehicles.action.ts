"use server";

import { SortOrder } from "mongoose";
import vehiclesModel from "../models/vehicles.model";
import { connectToDB } from "../moongose";
import { unSlugify } from "@/utils/utils";

export type Vehicle = {
  id: string;
  type: "CARRO" | "MOTO";
  primaryImage: string;
  images: string[];
  brand: string;
  model: string;
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
  await connectToDB();

  const vehicles = await vehiclesModel
    .find({
      status: "ATIVO",
      homePage: true,
    })
    .limit(8)
    .exec();

  const data = vehicles?.map((vehicle) => {
    return {
      id: vehicle._id.toString(),
      type: vehicle.type,
      images: vehicle.images,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      description: vehicle.description,
      status: vehicle.status,
      modelYear: vehicle.modelYear,
      about: vehicle.about,
      itens: vehicle.itens,
      km: vehicle.km,
      fuel: vehicle.fuel,
      exchange: vehicle.exchange,
      singleOwner: vehicle.singleOwner,
      paidIPVA: vehicle.paidIPVA,
      licensed: vehicle.licensed,
      accessCount: vehicle?.accessCount || 0,
    };
  });

  return data;
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
    await connectToDB();

    const skip = (page - 1) * 16;

    const filters: any = {
      status: "ATIVO",
    };

    const search =
      typeof searchParams?.search === "string" ? searchParams.search.trim() : "";
    if (search) {
      filters.$text = { $search: search };
    }

    if (type) {
      filters.type = {
        $regex: type === "carros" ? "CARRO" : "MOTO",
        $options: "i",
      };
    }
    if (model) {
      filters.model = { $regex: unSlugify(model), $options: "i" };
    }
    if (brand) {
      console.log("brand", brand);
      filters.brand = { $regex: unSlugify(brand), $options: "i" };
    }
    if (year) {
      filters.year = year; // Para o ano, a busca é case sensitive, mas você pode ajustar conforme necessário.
    }

    if (searchParams?.yearGte) {
      filters.year = { ...filters.year, $gte: Number(searchParams.yearGte) };
    }
    if (searchParams?.yearLte) {
      filters.year = { ...filters.year, $lte: Number(searchParams.yearLte) };
    }
    if (searchParams?.priceGte) {
      filters.price = { ...filters.price, $gte: Number(searchParams.priceGte) };
    }
    if (searchParams?.priceLte) {
      filters.price = { ...filters.price, $lte: Number(searchParams.priceLte) };
    }
    if (searchParams?.kmGte) {
      filters.km = { ...filters.km, $gte: Number(searchParams.kmGte) };
    }
    if (searchParams?.kmLte) {
      filters.km = { ...filters.km, $lte: Number(searchParams.kmLte) };
    }
    if (searchParams?.exchange) {
      filters.exchange = { $regex: searchParams.exchange, $options: "i" };
    }

    const sortOptions: Record<string, SortOrder> = {}; // Define um objeto de ordenação

    switch (sort) {
      case "maiorPreco":
        sortOptions.price = -1; // Ordem decrescente
        break;
      case "menorPreco":
        sortOptions.price = 1; // Ordem crescente
        break;
      case "menorKm":
        sortOptions.km = 1; // Ordem crescente
        break;
      case "anoMaisNovo":
        sortOptions.year = -1; // Ordem decrescente
        break;
      default:
        sortOptions.createdAt = -1; // Ordem padrão, por exemplo, pela data de criação
    }

    console.log("sortOptions", sortOptions);
    const vehicles = await vehiclesModel
      .find(filters)
      .sort(sortOptions as any)
      .skip(skip)
      .limit(16)
      .exec();

    const data = vehicles?.map((vehicle) => {
      return {
        id: vehicle._id.toString(),
        type: vehicle.type,
        images: vehicle.images,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        description: vehicle.description,
        status: vehicle.status,
        modelYear: vehicle.modelYear,
        about: vehicle.about,
        itens: vehicle.itens,
        km: vehicle.km,
        fuel: vehicle.fuel,
        exchange: vehicle.exchange,
        singleOwner: vehicle.singleOwner,
        paidIPVA: vehicle.paidIPVA,
        licensed: vehicle.licensed,
        accessCount: vehicle?.accessCount || 0,
      };
    });

    const totalRows = await vehiclesModel.countDocuments({
      ...filters,
    });

    const totalPages = Math.ceil(totalRows / 16);

    return {
      meta: {
        totalRows,
        totalPages,
      },
      records: data,
    };
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw new Error("Error fetching vehicles");
  }
};

export const getVehicleById = async (id: string): Promise<Vehicle | null> => {
  await connectToDB();

  const vehicle = await vehiclesModel.findById(id).exec();

  if (!vehicle) {
    return null;
  }

  return {
    id: vehicle._id.toString(),
    type: vehicle.type,
    primaryImage: vehicle.primaryImage,
    images: vehicle.images,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    description: vehicle.description,
    price: vehicle.price,
    modelYear: vehicle.modelYear,
    about: vehicle.about,
    itens: vehicle.itens,
    km: vehicle.km,
    body: vehicle.body,
    color: vehicle.color,
    fuel: vehicle.fuel,
    exchange: vehicle.exchange,
    singleOwner: vehicle.singleOwner,
    paidIPVA: vehicle.paidIPVA,
    licensed: vehicle.licensed,
    width: vehicle.width,
    height: vehicle.height,
    weight: vehicle.weight,
    tank: vehicle.tank,
    length: vehicle.length,
    wheelbase: vehicle.wheelbase,
    occupants: vehicle.occupants,
    trunk: vehicle.trunk,
    accessCount: vehicle.accessCount,
    status: vehicle.status,
    homePage: vehicle.homePage,
    createdAt: new Date(vehicle.createdAt),
    updatedAt: new Date(vehicle.updatedAt),
  };
};
