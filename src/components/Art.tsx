import { ReactNode, useState } from "react";

const Art = ({ children }: { children: ReactNode }) => {


    const [darkMode] = useState<boolean>(() => { return window.matchMedia("(prefers-color-scheme: dark)").matches; });

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <div className="flex items-center justify-center relative w-screen max-w-full min-h-svh md:min-h-screen overflow-hidden pattern-wavy pattern-purple-950 pattern-bg-slate-50 dark:pattern-bg-slate-950 pattern-size-8 pattern-opacity-80">
                <div className="top-wave z-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="fill-purple-950 absolute top-0 -left-full rotate-180 z-0">
                        <path fill-opacity="1" d="M0,288L60,282.7C120,277,240,267,360,240C480,213,600,171,720,176C840,181,960,235,1080,250.7C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    </svg>
                </div>
                {children}
                <div className="bot-wave z-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="fill-violet-600 absolute bottom-0 -right-full" style={{ transform: 'rotate(359deg)' }}>
                        <path fill-opacity="1" d="M0,288L60,282.7C120,277,240,267,360,240C480,213,600,171,720,176C840,181,960,235,1080,250.7C1200,267,1320,245,1380,234.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    )

}

export default Art