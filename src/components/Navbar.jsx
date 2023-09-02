
export default function Navbar(){
    return (
    <>

        <div className="px-5 sm:px-2 py-5 bg-blue-500">
            <div className="flex items-center justify-between">
                <div className="flex items-center text-5xl font-bold px-5">
                    <p>Tasker</p>
                </div>
                <div className="px-5 justify-center items-center">
                    <div className="flex space-x-5">
                        <p>Login</p>
                        <p>Register</p>
                    </div>
                </div>
            </div>
        </div>

    </>
    )
}