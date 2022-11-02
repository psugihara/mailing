import { useRouter } from "next/router";
import Image from "next/image";
import NavBarButton from "./NavBarButton";
import IconEye from "../icons/IconEye";
import IconHome from "../icons/IconHome";
import IconGear from "../icons/IconGear";
import IconAudience from "../icons/IconAudience";

type NavBarProps = { children: React.ReactNode };

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  const router = useRouter();
  const { nav } = router.query;

  return (
    <div className="flex flex-grow">
      {(nav ||
        (process.env.NODE_ENV !== "development" &&
          process.env.AUDIENCE_FEATURE_FLAG)) && (
        <nav className="flex px-3 flex-col space-y-4 py-5 content-between justify-between border-dotted border-r border-gray-600">
          {(nav || process.env.HOME_FEATURE_FLAG) && (
            <NavBarButton
              active={router.route === "/"}
              href="/"
              Icon={IconHome}
              name="Home"
            />
          )}
          <NavBarButton
            active={router.route === "/previews/[[...path]]"}
            href="/previews"
            Icon={IconEye}
            name="Previews"
          />
          <NavBarButton
            active={router.route === "/audiences/[[...path]]"}
            href="/audiences"
            Icon={IconAudience}
            name="Audiences"
          />
          <NavBarButton
            active={router.route === "/settings" || router.route === "/login"}
            href="/settings"
            Icon={IconGear}
            name="Settings"
          />
          <div className="flex-grow flex-1" />
          <Image
            src="/logo-mark.svg"
            alt="Logo"
            width={24}
            height={30}
            title="Logo"
          />
        </nav>
      )}
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default NavBar;
