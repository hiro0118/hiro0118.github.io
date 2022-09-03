import { ProfilePage } from "./profile-page/ProfilePage";
import { TokyoSportsPage } from "./tokyo-sports-page/TokyoSportsPage";
import { WorkInProgressPage } from "./wip-page/WorkInProgressPage";
import { PageInfo } from "../components/menu-bar/PageInfo";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

export const pages: PageInfo[] = [
  {
    title: "Profile",
    path: "",
    icon: AccountCircleIcon,
    element: ProfilePage,
  },
  {
    title: "Tokyo Sports",
    path: "tokyo-sports",
    icon: SportsTennisIcon,
    element: TokyoSportsPage,
  },
  {
    title: "Page3",
    path: "page3",
    icon: ContactSupportIcon,
    element: WorkInProgressPage,
  }
]