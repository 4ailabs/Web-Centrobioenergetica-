import React, { useState } from "react"
import { addPropertyControls, ControlType } from "framer"

export default function CourseDetailPage(props) {
    const {
        courseTitle = "Integration of 3D Elements",
        courseDescription = "The integration of three-dimensional (3D) elements in web design is gaining popularity, offering a visually engaging and immersive experience.",
        courseContent = "The integration of three-dimensional (3D) elements in web design is gaining popularity, offering a visually engaging and immersive experience. This approach allows designers to create more dynamic and interactive interfaces that can better capture user attention and provide a more engaging user experience.\n\n3D elements can be implemented through various technologies such as WebGL, Three.js, and CSS 3D transforms. These technologies enable the creation of realistic 3D models, animations, and interactive elements that can be seamlessly integrated into web applications.",
        courseImage = "https://images.unsplash.com/photo-1592478411213-6153e4c4c8f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        author = "Emily Johnson",
        level = "Beginner",
        lessons = 22,
        language = "English",
        subtitles = "English, Spanish, Portuguese, German, French, Italian, Polish, Dutch",
        price = "$99.99",
        backgroundColor = "#ffffff",
        textColor = "#1f2937",
        accentColor = "#000000",
        onBackToCourses,
        onBuyNow,
        onNextCourse,
    } = props

    const [isImageLoaded, setIsImageLoaded] = useState(false)

    const handleImageLoad = () => {
        setIsImageLoaded(true)
    }

    const handleBackClick = () => {
        if (onBackToCourses) {
            onBackToCourses()
        }
    }

    const handleBuyNowClick = () => {
        if (onBuyNow) {
            onBuyNow()
        }
    }

    const handleNextCourseClick = () => {
        if (onNextCourse) {
            onNextCourse()
        }
    }

    return (
        <div style={{
            backgroundColor: backgroundColor,
            minHeight: "100vh",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
            color: textColor,
            padding: "0",
            margin: "0",
        }}>
            {/* Header */}
            <div style={{
                padding: "24px 32px",
                borderBottom: "1px solid #e5e7eb",
            }}>
                <button
                    onClick={handleBackClick}
                    style={{
                        background: "none",
                        border: "none",
                        color: textColor,
                        fontSize: "16px",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 0",
                        transition: "opacity 0.2s ease",
                    }}
                >
                    ← BACK TO COURSES
                </button>
            </div>

            {/* Main Content */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "32px",
            }}>
                {/* Course Image */}
                <div style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    marginBottom: "32px",
                    position: "relative",
                    backgroundColor: "#f3f4f6",
                }}>
                    <img
                        src={courseImage}
                        alt={courseTitle}
                        onLoad={handleImageLoad}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: isImageLoaded ? 1 : 0,
                            transition: "opacity 0.3s ease",
                        }}
                    />
                    {!isImageLoaded && (
                        <div style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#9ca3af",
                            fontSize: "16px",
                        }}>
                            Cargando imagen...
                        </div>
                    )}
                </div>

                {/* Content Layout */}
                <div style={{
                    display: "flex",
                    gap: "48px",
                    alignItems: "flex-start",
                }}>
                    {/* Main Content */}
                    <div style={{
                        flex: "1",
                        minWidth: "0",
                    }}>
                        <h1 style={{
                            fontSize: "32px",
                            fontWeight: "700",
                            marginBottom: "16px",
                            lineHeight: "1.2",
                        }}>
                            {courseTitle}
                        </h1>
                        
                        <p style={{
                            fontSize: "18px",
                            fontWeight: "600",
                            marginBottom: "24px",
                            lineHeight: "1.5",
                            color: "#4b5563",
                        }}>
                            {courseDescription}
                        </p>

                        <div style={{
                            fontSize: "16px",
                            lineHeight: "1.6",
                            color: "#374151",
                        }}>
                            {courseContent.split('\n').map((paragraph, index) => (
                                <p key={index} style={{
                                    marginBottom: "16px",
                                }}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Course Details Sidebar */}
                    <div style={{
                        width: "320px",
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        padding: "24px",
                        position: "sticky",
                        top: "32px",
                    }}>
                        <h2 style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            marginBottom: "24px",
                            color: textColor,
                        }}>
                            Course Details
                        </h2>

                        {/* Course Details List */}
                        <div style={{
                            marginBottom: "32px",
                        }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "12px 0",
                                borderBottom: "1px solid #f3f4f6",
                            }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#6b7280",
                                }}>Author</span>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: textColor,
                                }}>{author}</span>
                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "12px 0",
                                borderBottom: "1px solid #f3f4f6",
                            }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#6b7280",
                                }}>Level</span>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: textColor,
                                }}>{level}</span>
                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "12px 0",
                                borderBottom: "1px solid #f3f4f6",
                            }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#6b7280",
                                }}>Lessons</span>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: textColor,
                                }}>{lessons}</span>
                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "12px 0",
                                borderBottom: "1px solid #f3f4f6",
                            }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#6b7280",
                                }}>Language</span>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: textColor,
                                }}>{language}</span>
                            </div>

                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                padding: "12px 0",
                                borderBottom: "1px solid #f3f4f6",
                            }}>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    color: "#6b7280",
                                    flex: "0 0 auto",
                                    marginRight: "16px",
                                }}>Subtitles</span>
                                <span style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: textColor,
                                    textAlign: "right",
                                    lineHeight: "1.4",
                                }}>{subtitles}</span>
                            </div>
                        </div>

                        {/* Buy Now Button */}
                        <button
                            onClick={handleBuyNowClick}
                            style={{
                                width: "100%",
                                backgroundColor: accentColor,
                                color: "#ffffff",
                                border: "none",
                                borderRadius: "8px",
                                padding: "16px 24px",
                                fontSize: "16px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                marginBottom: "16px",
                            }}
                        >
                            BUY NOW
                        </button>

                        <div style={{
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#6b7280",
                        }}>
                            {price}
                        </div>
                    </div>
                </div>

                {/* Next Course Button */}
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "48px",
                }}>
                    <button
                        onClick={handleNextCourseClick}
                        style={{
                            backgroundColor: "#ffffff",
                            color: textColor,
                            border: "1px solid #d1d5db",
                            borderRadius: "8px",
                            padding: "12px 24px",
                            fontSize: "14px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                        }}
                    >
                        NEXT COURSE
                    </button>
                </div>
            </div>
        </div>
    )
}

// Property Controls for Framer
addPropertyControls(CourseDetailPage, {
    courseTitle: {
        type: ControlType.String,
        title: "Course Title",
        defaultValue: "Integration of 3D Elements",
    },
    courseDescription: {
        type: ControlType.String,
        title: "Course Description",
        defaultValue: "The integration of three-dimensional (3D) elements in web design is gaining popularity, offering a visually engaging and immersive experience.",
        multiline: true,
    },
    courseContent: {
        type: ControlType.String,
        title: "Course Content",
        defaultValue: "The integration of three-dimensional (3D) elements in web design is gaining popularity, offering a visually engaging and immersive experience. This approach allows designers to create more dynamic and interactive interfaces that can better capture user attention and provide a more engaging user experience.\n\n3D elements can be implemented through various technologies such as WebGL, Three.js, and CSS 3D transforms. These technologies enable the creation of realistic 3D models, animations, and interactive elements that can be seamlessly integrated into web applications.",
        multiline: true,
    },
    courseImage: {
        type: ControlType.Image,
        title: "Course Image",
        defaultValue: "https://images.unsplash.com/photo-1592478411213-6153e4c4c8f1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    author: {
        type: ControlType.String,
        title: "Author",
        defaultValue: "Emily Johnson",
    },
    level: {
        type: ControlType.Enum,
        title: "Level",
        options: ["Beginner", "Intermediate", "Advanced"],
        defaultValue: "Beginner",
    },
    lessons: {
        type: ControlType.Number,
        title: "Lessons",
        defaultValue: 22,
        min: 1,
        max: 100,
    },
    language: {
        type: ControlType.String,
        title: "Language",
        defaultValue: "English",
    },
    subtitles: {
        type: ControlType.String,
        title: "Subtitles",
        defaultValue: "English, Spanish, Portuguese, German, French, Italian, Polish, Dutch",
        multiline: true,
    },
    price: {
        type: ControlType.String,
        title: "Price",
        defaultValue: "$99.99",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background Color",
        defaultValue: "#ffffff",
    },
    textColor: {
        type: ControlType.Color,
        title: "Text Color",
        defaultValue: "#1f2937",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent Color",
        defaultValue: "#000000",
    },
    onBackToCourses: {
        type: ControlType.EventHandler,
        title: "Back to Courses",
    },
    onBuyNow: {
        type: ControlType.EventHandler,
        title: "Buy Now",
    },
    onNextCourse: {
        type: ControlType.EventHandler,
        title: "Next Course",
    },
})
