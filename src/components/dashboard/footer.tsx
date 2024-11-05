import Image from 'next/image'
import Link from 'next/link'
import wpIcon from '../../../public/assets/whatsapp.svg'
import { Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full bg-current">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8 ">
          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-white font-medium mb-7">
              {process.env.NEXT_PUBLIC_ACCOUNT_NAME}
            </h4>
            <ul className="text-base  transition-all duration-500">
              <li className="mb-6">
                <Link href="/" className="text-muted hover:text-primary">
                  Início
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  href="/comprar/carros"
                  className=" text-muted hover:text-primary"
                >
                  Comprar
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  href="/#vender"
                  className=" text-muted hover:text-primary"
                >
                  Vender
                </Link>
              </li>
              <li>
                <Link
                  href="/#financiar"
                  className=" text-muted hover:text-primary"
                >
                  Financiamento
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:mx-auto text-left ">
            <h4 className="text-lg text-white font-medium mb-7">Localização</h4>
            <span className="text-muted">
              {' '}
              R. Pereira Barreto, 3427 - Eldorado, São José do Rio Preto - SP,
              15043-150
            </span>

            <div className="text-primary mt-4 flex gap-2">
              <MapPin />
              <a
                className="font-semibold"
                href="https://www.google.com/maps/place/NorthBens+Ve%C3%ADculos/@-20.7819354,-49.4017516,17z/data=!3m1!4b1!4m6!3m5!1s0x94bdadd15efccdb3:0xbd0c05fb174378c9!8m2!3d-20.7819404!4d-49.3991767!16s%2Fg%2F11flxm_h4m?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
              >
                Como chegar?
              </a>
            </div>
          </div>
          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-white font-medium mb-7">Contatos</h4>
            <ul className="text-base  transition-all duration-500">
              <li className="mb-6 flex gap-2">
                <Image
                  src={wpIcon}
                  width={20}
                  height={20}
                  alt="WhatsApp Icon"
                />
                <a
                  href="https://api.whatsapp.com/send?phone=5517988034098&text=Ol%C3%A1%20gostaria%20de%20vender%20ou%20trocar%20meu%20carro.%0APode%20me%20ajudar%3F"
                  target="_blank"
                  className=" text-muted hover:text-primary"
                >
                  17 98803-4098
                </a>
              </li>
              <li className="mb-6 flex gap-2 text-muted">
                <Mail />
                <span className=" text-muted hover:text-primary">
                  northbens@outlook.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-7 border-t border-gray-400">
          <div className="flex items-center justify-center flex-col lg:justify-between lg:flexRow">
            <span className="text-sm text-muted ">
              <span>{process.env.NEXT_PUBLIC_ACCOUNT_NAME}</span> 2024, Todos os
              direitos reservados.
            </span>
            <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-4 ">
              <a
                href="https://www.instagram.com/northbveiculos/"
                target="_blank"
                className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-iprimary-600"
              >
                <svg
                  className="w-[1.25rem] h-[1.125rem] text-white"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.70975 7.93663C4.70975 6.65824 5.76102 5.62163 7.0582 5.62163C8.35537 5.62163 9.40721 6.65824 9.40721 7.93663C9.40721 9.21502 8.35537 10.2516 7.0582 10.2516C5.76102 10.2516 4.70975 9.21502 4.70975 7.93663ZM3.43991 7.93663C3.43991 9.90608 5.05982 11.5025 7.0582 11.5025C9.05658 11.5025 10.6765 9.90608 10.6765 7.93663C10.6765 5.96719 9.05658 4.37074 7.0582 4.37074C5.05982 4.37074 3.43991 5.96719 3.43991 7.93663ZM9.97414 4.22935C9.97408 4.39417 10.0236 4.55531 10.1165 4.69239C10.2093 4.82946 10.3413 4.93633 10.4958 4.99946C10.6503 5.06259 10.8203 5.07916 10.9844 5.04707C11.1484 5.01498 11.2991 4.93568 11.4174 4.81918C11.5357 4.70268 11.6163 4.55423 11.649 4.39259C11.6817 4.23095 11.665 4.06339 11.6011 3.91109C11.5371 3.7588 11.4288 3.6286 11.2898 3.53698C11.1508 3.44536 10.9873 3.39642 10.8201 3.39635H10.8197C10.5955 3.39646 10.3806 3.48424 10.222 3.64043C10.0635 3.79661 9.97434 4.00843 9.97414 4.22935ZM4.21142 13.5892C3.52442 13.5584 3.15101 13.4456 2.90286 13.3504C2.57387 13.2241 2.33914 13.0738 2.09235 12.8309C1.84555 12.588 1.69278 12.3569 1.56527 12.0327C1.46854 11.7882 1.3541 11.4201 1.32287 10.7431C1.28871 10.0111 1.28189 9.79119 1.28189 7.93669C1.28189 6.08219 1.28927 5.86291 1.32287 5.1303C1.35416 4.45324 1.46944 4.08585 1.56527 3.84069C1.69335 3.51647 1.84589 3.28513 2.09235 3.04191C2.3388 2.79869 2.57331 2.64813 2.90286 2.52247C3.1509 2.42713 3.52442 2.31435 4.21142 2.28358C4.95417 2.24991 5.17729 2.24319 7.0582 2.24319C8.9391 2.24319 9.16244 2.25047 9.90582 2.28358C10.5928 2.31441 10.9656 2.42802 11.2144 2.52247C11.5434 2.64813 11.7781 2.79902 12.0249 3.04191C12.2717 3.2848 12.4239 3.51647 12.552 3.84069C12.6487 4.08513 12.7631 4.45324 12.7944 5.1303C12.8285 5.86291 12.8354 6.08219 12.8354 7.93669C12.8354 9.79119 12.8285 10.0105 12.7944 10.7431C12.7631 11.4201 12.6481 11.7881 12.552 12.0327C12.4239 12.3569 12.2714 12.5882 12.0249 12.8309C11.7784 13.0736 11.5434 13.2241 11.2144 13.3504C10.9663 13.4457 10.5928 13.5585 9.90582 13.5892C9.16306 13.6229 8.93994 13.6296 7.0582 13.6296C5.17645 13.6296 4.95395 13.6229 4.21142 13.5892ZM4.15307 1.03424C3.40294 1.06791 2.89035 1.18513 2.4427 1.3568C1.9791 1.53408 1.58663 1.77191 1.19446 2.1578C0.802277 2.54369 0.56157 2.93108 0.381687 3.38797C0.207498 3.82941 0.0885535 4.3343 0.0543922 5.07358C0.0196672 5.81402 0.0117188 6.05074 0.0117188 7.93663C0.0117188 9.82252 0.0196672 10.0592 0.0543922 10.7997C0.0885535 11.539 0.207498 12.0439 0.381687 12.4853C0.56157 12.9419 0.802334 13.3297 1.19446 13.7155C1.58658 14.1012 1.9791 14.3387 2.4427 14.5165C2.89119 14.6881 3.40294 14.8054 4.15307 14.839C4.90479 14.8727 5.1446 14.8811 7.0582 14.8811C8.9718 14.8811 9.212 14.8732 9.96332 14.839C10.7135 14.8054 11.2258 14.6881 11.6737 14.5165C12.137 14.3387 12.5298 14.1014 12.9219 13.7155C13.3141 13.3296 13.5543 12.9419 13.7347 12.4853C13.9089 12.0439 14.0284 11.539 14.062 10.7997C14.0962 10.0587 14.1041 9.82252 14.1041 7.93663C14.1041 6.05074 14.0962 5.81402 14.062 5.07358C14.0278 4.33424 13.9089 3.82913 13.7347 3.38797C13.5543 2.93135 13.3135 2.5443 12.9219 2.1578C12.5304 1.7713 12.137 1.53408 11.6743 1.3568C11.2258 1.18513 10.7135 1.06735 9.96388 1.03424C9.21256 1.00058 8.97236 0.992188 7.05876 0.992188C5.14516 0.992188 4.90479 1.00002 4.15307 1.03424Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61562896466392"
                target="_blank"
                className="w-9 h-9 rounded-full bg-gray-700 flex justify-center items-center hover:bg-iprimary-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[1.5rem] text-white"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 30 30"
                >
                  <path
                    d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
