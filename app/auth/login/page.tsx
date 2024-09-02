import { login } from './actions'

export default function LoginPage() {
    return (
    <div
        className="w-full h-[80vh] mx-auto p-8 bg-[url('/images/BUKC/9.jpg')] bg-fixed flex justify-center items-center"
    >
        <div className="bg-nile-blue-500/80 p-5 rounded-xl shadow-lg max-w-[400px] max-h-[300px]">
            <div className="text-center">
                <h1 className="text-2xl font-bold ">Sign In</h1>

            </div>
            <div>
                <form className="flex flex-col">
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="email" required/>
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="password" required/>
                    <button formAction={login}>Log in</button>
                </form>
            </div>
        </div>


    </div>
    )
}