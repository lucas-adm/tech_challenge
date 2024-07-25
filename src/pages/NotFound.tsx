import { useState } from "react"
import { Link } from "react-router-dom"

const NotFound = () => {

  const [darkMode] = useState<boolean>(() => { return window.matchMedia("(prefers-color-scheme: dark)").matches; });

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <section className="w-screen h-svh md:h-screen flex flex-col gap-4 flex-center justify-center items-center bg-slate-50 dark:bg-slate-950">
        <Link to={'/'}><img src="/imgs/favicon.png" alt="favicon" className="w-24 rounded-full border-2 border-transparent hover:border-indigo-500 transition-colors" /></Link>
        <h1 className="text-3xl text-indigo-500">404</h1>
      </section>
    </div>
  )
}

export default NotFound