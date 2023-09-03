
export default function Navbar(){
    return (
    <>

        <div className="px-5 sm:px-2 py-5 bg-blue-500">
            <div className="flex items-end justify-between">
                <div className="flex items-center text-5xl font-bold px-5">
                    <p>Tasker</p>
                </div>
                <div className="px-5 flex">
                    <div className="flex space-x-5">
                        <p><b>Login</b></p>
                        <p><b>Register</b></p>
                    </div>
                </div>
            </div>
        </div>

    </>
    )
}