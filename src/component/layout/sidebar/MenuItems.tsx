import {
  IconLayoutDashboard,
  IconUsers,
  IconUsersPlus,
  IconFileText,
  IconClipboardList,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Beranda",
  },
  {
    id: uniqueId(),
    title: "Dasbor",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Rekrutmen",
  },
  {
    id: uniqueId(),
    title: "Permintaan Tenaga Kerja",
    icon: IconUsersPlus,
    href: "/permintaan-tenaga-kerja",
  },
  {
    id: uniqueId(),
    title: "Daftar Calon Pegawai",
    icon: IconUsers,
    href: "/daftar-calon-pegawai",
  },
  {
    navlabel: true,
    subheader: "Pulling CV Trial",
  },
  {
    id: uniqueId(),
    title: "Data CV",
    icon: IconFileText,
    href: "/data-cv",
  },
  {
    navlabel: true,
    subheader: "Asesmen Tes",
  },
  {
    id: uniqueId(),
    title: "Daftar Proyek Asesmen",
    icon: IconClipboardList,
    href: "/daftar-proyek-asesmen",
  },
];

export default Menuitems;
