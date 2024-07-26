import Art from "../components/Art";

import { Link } from "react-router-dom"

const NotFound = () => {


  return (
    <Art>
      <div className="z-10">
        <Link to={'/'}>
          <section className="flex flex-col gap-4 flex-center justify-center items-center bg-slate-50/30 backdrop-blur-sm p-4 rounded-lg shadow-2xl">
            <img src="/imgs/favicon.png" alt="favicon" className="w-24 -full backdrop transition" style={{ filter: "drop-shadow(0 0 2rem #5b21b6)" }} />
            <h1 className="text-3xl dark:text-white text-violet-900 font-semibold">404</h1>
          </section>
        </Link>
      </div>
    </Art>

  )

}

export default NotFound