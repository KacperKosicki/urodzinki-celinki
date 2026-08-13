import { useEffect, useRef, useState } from "react";
import "./StorySection.scss";

const StorySection = ({ section, index }) => {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = sectionRef.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.2,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const isReverse = index % 2 !== 0;

    return (
        <section
            ref={sectionRef}
            className={`storySection ${visible ? "storySection--visible" : ""}`}
        >
            <div
                className={`storySection__inner ${isReverse ? "storySection__inner--reverse" : ""
                    }`}
            >
                <div className="storySection__visual">
                    {section.image ? (
                        <img src={section.image} alt="" />
                    ) : (
                        <div className="storySection__placeholder">
                            <span>{section.number}</span>

                            <p>tu później będzie grafika</p>
                        </div>
                    )}
                </div>

                <div className="storySection__content">
                    <div className="storySection__meta">
                        <span>{section.number}</span>

                        <span>{section.small}</span>
                    </div>

                    <h2>{section.title}</h2>

                    <p className="storySection__text">{section.text}</p>
                </div>
            </div>
        </section>
    );
};

export default StorySection;