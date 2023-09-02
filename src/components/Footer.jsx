import {TiSocialLinkedin} from "react-icons/ti"
import {BsGithub} from "react-icons/bs"
import {FaHackerrank} from "react-icons/fa"
import {RiInstagramFill} from "react-icons/ri"


export default function Footer(){
    return(
        <>
            <div className="py-5 bg-blue-500 lg:px-32">
                <div className="flex justify-between items-center">
                    <div className="text-3xl font-bold">Tasker</div>
                    <div className="font-semibold">Copyrights © 2023</div>
                    <div className="flex justify-between space-x-2  lg:space-x-4 text-xl">
                        <a href="https://www.linkedin.com/in/pradeep-pradeep-1bbb3521a/"><TiSocialLinkedin/></a>
                        <a href="https://github.com/Pradeep1G/"><BsGithub/></a>
                        <a href="https://www.hackerrank.com/geddadavenkatap1"><FaHackerrank/></a>
                        <a href="https://www.instagram.com/venkatapradeep.g/"><RiInstagramFill/></a>
                    </div>
                </div>
            </div>
        </>
    )
}