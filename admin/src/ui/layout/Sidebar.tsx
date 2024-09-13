import { FC } from "react";

import {
  AddImageIcon,
  AddPostIcon,
  BedIcon,
  BrunchDiningIcon,
  CallIcon,
  GroupIcon,
  ListBulletedIcon,
  NewspaperIcon,
  RateReviewIcon,
  TheaterComedyIcon,
} from "@/ui/icons";
import { SidebarContainer, SidebarLink } from "@/ui/layout";
import { AuthorizationGuard } from "@/lib/authorization";

export const Sidebar: FC = () => (
  <SidebarContainer
    component="nav"
    sx={{
      position: "fixed",
      top: 0,
      display: "flex",
      flexDirection: "column",
      // sidebar height + padding top
      paddingTop: "96px",
      height: "100vh",
      backgroundColor: "common.white",
      zIndex: 1,
    }}
  >
    <AuthorizationGuard allowedRoles={["admin"]}>
      <SidebarLink href="/users" icon={<GroupIcon />}>
        Пользователи
      </SidebarLink>
    </AuthorizationGuard>
    <AuthorizationGuard allowedRoles={["admin", "manager"]}>
      <SidebarLink href="/rooms" icon={<BedIcon />}>
        Номера
      </SidebarLink>
    </AuthorizationGuard>
    <AuthorizationGuard allowedRoles={["admin", "manager"]}>
      <SidebarLink href="/news" icon={<NewspaperIcon />}>
        Новости
      </SidebarLink>
    </AuthorizationGuard>
    <AuthorizationGuard allowedRoles={["admin"]}>
      <SidebarLink href="/special-offers" icon={<BrunchDiningIcon />}>
        Спецпредложения
      </SidebarLink>
    </AuthorizationGuard>
    <AuthorizationGuard
      allowedRoles={["admin", "manager"]}
      allowedManagerCities={["obn"]}
    >
      <SidebarLink href="/leisures" icon={<TheaterComedyIcon />}>
        Досуг
      </SidebarLink>
    </AuthorizationGuard>
    <AuthorizationGuard allowedRoles={["admin", "manager"]}>
      <SidebarLink href="/reviews" icon={<RateReviewIcon />}>
        Отзывы
      </SidebarLink>
    </AuthorizationGuard>
    <AuthorizationGuard allowedRoles={["admin", "manager"]}>
      <SidebarLink href="/hotel-images" icon={<AddImageIcon />}>
        Фотографии отеля
      </SidebarLink>
    </AuthorizationGuard>
    <AuthorizationGuard allowedRoles={["admin", "manager"]}>
      <SidebarLink href="/newsletters" icon={<AddPostIcon />}>
        Рассылки
      </SidebarLink>
    </AuthorizationGuard>
    <AuthorizationGuard allowedRoles={["admin", "manager"]}>
      <SidebarLink href="/contacts" icon={<CallIcon />}>
        Контакты
      </SidebarLink>
    </AuthorizationGuard>
    <AuthorizationGuard allowedRoles={["admin"]}>
      <SidebarLink href="/change-logs" icon={<ListBulletedIcon />}>
        Журнал действий
      </SidebarLink>
    </AuthorizationGuard>
  </SidebarContainer>
);
