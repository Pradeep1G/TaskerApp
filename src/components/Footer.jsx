import { TiSocialLinkedin } from "react-icons/ti";
import { BsGithub } from "react-icons/bs";
import { FaHackerrank } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  return (
    <>
      <div className="py-5 md:bg-blue-400 text-blue-950 lg:px-32 border-t-2 rounded-t-xl">

        <div className="md:flex md:justify-between justify-center items-center">
          <div className="text-3xl flex justify-center  font-semibold md:font-bold">Tasker</div>
          <div className="font-semibold flex justify-center ">Copyrights © 2023</div>
          <div className="flex justify-center space-x-2 lg:space-x-4 text-xl">
            <a href="https://www.linkedin.com/in/pradeep-pradeep-1bbb3521a/">
              <TiSocialLinkedin />
            </a>
            <a href="https://github.com/Pradeep1G/">
              <BsGithub />
            </a>
            <a href="https://www.hackerrank.com/geddadavenkatap1">
              <FaHackerrank />
            </a>
            <a href="https://www.instagram.com/venkatapradeep.g/">
              <RiInstagramFill />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
