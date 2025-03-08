"use client"
import { signIn } from "next-auth/react"
import { LogoHead } from "@/components/shared/app-logo"
import { useState } from "react"
import { useRouter } from "next/navigation"

const LoginPage = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const router = useRouter()

	const handleSubmit = async (e) => {
		e.preventDefault()
		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
		})

		if (result?.error) {
			setError(result.error)
		} else {
			router.push("/kimok")
		}
	}

	return (
		<>
			<div className="bg-primary">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<div className="flex items-center mb-6">
						<LogoHead />
					</div>
					<div className="w-full bg-card rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-card-foreground md:text-2xl">
								Sign in to your account
							</h1>
							<form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
								<div>
									<label htmlFor="email" className="block mb-2 text-sm font-medium text-card-foreground">
										Your email
									</label>
									<input
										type="text"
										name="email"
										id="email"
										className="w-full border p-2 text-sm outline-2 rounded-sm"
										placeholder="name@company.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="password" className="block mb-2 text-sm font-medium text-card-foreground">
										Your password
									</label>
									<input
										type="password"
										name="password"
										id="password"
										placeholder="••••••••"
										autoComplete="on"
										className="w-full border p-2 text-sm outline-2 rounded-sm"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>
								{error && <div className="text-destructive">{error}</div>}
								<button
									type="submit"
									className="w-full text-primary-foreground bg-primary hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
								>
									Sign in
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default LoginPage
