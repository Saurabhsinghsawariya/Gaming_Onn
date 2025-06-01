import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { heroContent, Images } from "../constant/Constant";

const Hero: React.FC = () => {
    const [currentImage, setCurrentImage] = useState<number>(0);
    const [isAutoSlide, setIsAutoSlide] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        let interval: NodeJS.Timeout;
        
        try {
            if (isAutoSlide) {
                interval = setInterval(() => {
                    setCurrentImage((prevImage) => (prevImage + 1) % Images.length);
                }, 3000);
            }
        } catch (err) {
            setError("Failed to start slideshow");
            console.error(err);
        }
        
        return () => clearInterval(interval);
    }, [isAutoSlide]);

    useEffect(() => {
        const handleBackgroundChange = () => {
            try {
                setIsAutoSlide(false);
                setCurrentImage(Images.length - 1);
            } catch (err) {
                setError("Failed to change background");
                console.error(err);
            }
        };

        window.addEventListener('changeBackground', handleBackgroundChange);
        return () => {
            window.removeEventListener('changeBackground', handleBackgroundChange);
        };
    }, []);

    const handleHomeClick = () => {
        try {
            setIsAutoSlide(false);
            setCurrentImage(Images.length - 1);
        } catch (err) {
            setError("Failed to handle home click");
            console.error(err);
        }
    };

    const handleJoinUs = () => {
        try {
            navigate('/join-us');
        } catch (err) {
            setError("Failed to navigate to Join Us page");
            console.error(err);
        }
    };

    return (
        <section className='relative min-h-screen bg-cover bg-center duration-1000 ease-in-out overflow-hidden'>
            {error && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md z-50">
                    {error}
                </div>
            )}
            <div className="absolute inset-0 bg-black opacity-50">
                {Images.map((image,index) =>(
                    <div key={index} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentImage ? 'opacity-100 z-10' :'opacity-0'} `} style={{backgroundImage:`url(${image.src})`, backgroundSize:'cover', backgroundPosition:'center'}}></div>
                ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                <div className="flex items-end space-x-3 md:space-x-4">
                    <div className="h-2 w-20 bg-gradient-to-r from-[#00ff66] to-[#0066ff] rounded-lg"></div>
                    <h1 className="text-2xl md:text-4xl font-bold tracking-wider bg-gradient-to-r from-[#00ff66] to-[#0066ff] bg-clip-text text-transparent">
                        --GamingOnn--
                    </h1>
                    <div className="h-2 w-20 bg-gradient-to-r from-[#0066ff] to-[#00ff66] rounded-lg"></div>
                </div>
                {heroContent.map((hero,index) => (
                    <div key={index} className="py-3">
                        <h1 className="text-lg lg:text-5xl md:text-4xl font-medium sm:max-w-md sm:text-3xl md:max-w-xl lg:max-w-2xl leading-relaxed">{hero.title}</h1>
                        <button 
                            onClick={handleJoinUs}
                            className="mt-6 py-3 px-6 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-2xl leading-relaxed transition-colors"
                        >
                            {hero.buttonText}
                        </button>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/95 to-transparent"></div>
        </section>
    );
};

export default Hero;