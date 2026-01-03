import React, { useState } from "react"

export default function CourseDetailPage(props) {
    const {
        courseTitle = "Integración de Elementos 3D",
        courseDescription = "La integración de elementos tridimensionales (3D) en el diseño web está ganando popularidad, ofreciendo una experiencia visualmente atractiva e inmersiva.",
        courseContent = "La integración de elementos tridimensionales (3D) en el diseño web está ganando popularidad, ofreciendo una experiencia visualmente atractiva e inmersiva. Este enfoque permite a los diseñadores crear interfaces más dinámicas e interactivas que pueden capturar mejor la atención del usuario y proporcionar una experiencia de usuario más atractiva.\n\nLos elementos 3D se pueden implementar a través de varias tecnologías como WebGL, Three.js y transformaciones CSS 3D. Estas tecnologías permiten la creación de modelos 3D realistas, animaciones y elementos interactivos que se pueden integrar perfectamente en aplicaciones web.",
        courseImage = "https://images.unsplash.com/photo-1592478411213-6153e4c4c8f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        author = "María González",
        level = "Principiante",
        lessons = 22,
        language = "Español",
        subtitles = "Español, Inglés, Portugués, Alemán, Francés, Italiano, Polaco, Holandés",
        price = "$99.99",
        backgroundColor = "#ffffff",
        textColor = "#1f2937",
        accentColor = "#000000",
        onBackToCourses = () => { },
        onBuyNow = () => { },
        onNextCourse = () => { },
    } = props

    const [isImageLoaded, setIsImageLoaded] = useState(false)

    const handleImageLoad = () => {
        setIsImageLoaded(true)
    }

    const handleBackClick = () => {
        onBackToCourses()
    }

    const handleBuyNowClick = () => {
        onBuyNow()
    }

    const handleNextCourseClick = () => {
        onNextCourse()
    }

    return (
        <div className="bg-[var(--bg-main)] min-h-screen text-[var(--text-main)] font-sans">
            {/* Header */}
            <div className="p-6 md:px-8 border-b border-zinc-200 dark:border-zinc-800">
                <button
                    onClick={handleBackClick}
                    className="bg-transparent border-none text-[var(--text-main)] text-base font-medium cursor-pointer flex items-center gap-2 py-2 transition-opacity duration-200 hover:opacity-70 uppercase tracking-wider"
                >
                    <span className="text-xl">←</span> VOLVER A CURSOS
                </button>
            </div>

            {/* Main Content */}
            <div className="flex flex-col max-w-[1200px] mx-auto p-6 md:p-8">
                {/* Course Image */}
                <div className="w-full h-[250px] md:h-[400px] rounded-2xl overflow-hidden mb-8 relative bg-zinc-100 dark:bg-zinc-900 shadow-xl">
                    <img
                        src={courseImage}
                        alt={courseTitle}
                        onLoad={handleImageLoad}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {!isImageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-base animate-pulse">
                            Cargando imagen...
                        </div>
                    )}
                </div>

                {/* Content Layout */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    {/* Main Content Section */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight text-zinc-900 dark:text-zinc-100">
                            {courseTitle}
                        </h1>

                        <p className="text-lg md:text-xl font-semibold mb-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {courseDescription}
                        </p>

                        <div className="text-base md:text-lg leading-relaxed text-zinc-800 dark:text-zinc-300 space-y-4">
                            {courseContent.split('\n').map((paragraph, index) => (
                                <p key={index}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Course Details Sidebar */}
                    <div className="w-full lg:w-[320px] bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 sticky top-8 shadow-sm backdrop-blur-sm">
                        <h2 className="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-100 uppercase tracking-widest text-[13px]">
                            Detalles del Curso
                        </h2>

                        {/* Course Details List */}
                        <div className="mb-8 space-y-1">
                            <div className="flex justify-between items-center py-3 border-b border-zinc-100 dark:border-zinc-800/50">
                                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-500">Instructora</span>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">{author}</span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-zinc-100 dark:border-zinc-800/50">
                                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-500">Nivel</span>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">{level}</span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-zinc-100 dark:border-zinc-800/50">
                                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-500">Lecciones</span>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">{lessons}</span>
                            </div>

                            <div className="flex justify-between items-center py-3 border-b border-zinc-100 dark:border-zinc-800/50">
                                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-500">Idioma</span>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-200">{language}</span>
                            </div>

                            <div className="flex justify-between items-start py-3 border-b border-zinc-100 dark:border-zinc-800/50">
                                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-500 flex-shrink-0 mr-4">Subtítulos</span>
                                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 text-right leading-snug">{subtitles}</span>
                            </div>
                        </div>

                        {/* Buy Now Button */}
                        <button
                            onClick={handleBuyNowClick}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl py-4 px-6 text-base font-bold uppercase tracking-widest cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-emerald-500/20 active:translate-y-0 active:shadow-md mb-4"
                        >
                            ACCESAR
                        </button>

                        <div className="text-center text-sm font-bold text-zinc-500 dark:text-zinc-400">
                            {price}
                        </div>
                    </div>
                </div>

                {/* Next Course Button */}
                <div className="flex justify-end mt-12">
                    <button
                        onClick={handleNextCourseClick}
                        className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-xl px-6 py-3 text-sm font-bold uppercase tracking-widest cursor-pointer transition-all duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700"
                    >
                        SIGUIENTE CURSO
                    </button>
                </div>
            </div>
        </div>
    )
}
