import React, {useRef} from 'react';
import Head from "next/head";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import {motion, motionValue, useMotionValue} from "framer-motion";

import TransitionEffect from "@/components/TransitionEffect";

const monthsInRussian = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = monthsInRussian[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};
const MovingImg = ({title, img, link}) => {

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const imgRef = useRef(null);

    function handleMouse(event) {
        imgRef.current.style.display = 'inline-block';
        x.set(event.pageX);
        y.set(-10);
    }

    function handleMouseLeave(event) {
        imgRef.current.style.display = 'none';
        x.set(0);
        y.set(0);
    }

    return (
        <Link href={link} target=''
              onMouseMove={handleMouse}
              onMouseLeave={handleMouseLeave}
        >
            <h2 className='capitalize text-xl font-semibold hover:underline'>{title}</h2>
            <FramerImage
                style={{x: x, y: y}}
                initial={{opacity: 0}}
                whileInView={{opacity: 1, transition: {duration: 0.2}}}
                ref={imgRef} src={img} alt={title} className='z-10 w-96 h-auto hidden absolute rounded-lg
                md:!hidden
                '/>
        </Link>
    )
}

const FramerImage = motion.img

const FeatureArticle = ({key, img, title, time, summary, link}) => {
    const formattedDate = formatDate(time);

    return (
        <li key={key}
            className='col-span-1 w-full p-4 bg-light border border-solid border-dark rounded-2xl relative dark:bg-dark dark:border-light'>
            <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark
			rounded-br-3xl dark:bg-light
			'/>
            <Link href={"articles/" + link} target=""
                  className='w-full inline-block cursor-pointer overflow-hidden rounded-lg'
            >
                <FramerImage src={img} alt={title} className="w-full h-auto"
                             whileHover={{scale: 1.05}}
                             transition={{duration: 0.2}}
                             sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                />
            </Link>
            <Link href={"articles/" + link} target="">
                <h2 className='text-2xl font-bold my-2 mt-4 hover:underline xs:text-lg'>{title}</h2>
            </Link>
            <p className='text-sm mb-2'>{summary}</p>
            <span className='text-primary font-semibold dark:text-primaryDark'>{formattedDate} года</span>
        </li>
    )
}

const Article = ({key, title, img, link, date}) => {
    const formattedDate = formatDate(date);

    return (
        <motion.li
            key={key}
            initial={{y: 200}}
            whileInView={{y: 0, transition: {duration: 0.5, ease: 'easeInOut'}}}
            viewport={{once: true}}
            className='relative w-full p-4 py-6 my-4 rounded-xl flex items-center
            justify-between bg-light text-dark first:mt-0 border border-solid border-dark
            border-r-4 border-b-4 dark:bg-dark dark:border-light dark:text-light
            sm:flex-col
            '>
            <MovingImg title={title} img={img} link={"articles/" + link}/>
            <span
                className='text-primary font-semibold pl-4 dark:text-primaryDark sm:self-start sm:pl-0 xs:text-sm'>{formattedDate} года</span>
        </motion.li>
    )
}

const Articles = ({articles, error}) => {

    const featureArticles = articles.slice(0, 4);
    const otherArticles = articles.slice(4);

    return (
        <>
            <Head>
                <title>Portfolio | Articles</title>
                <meta name="description" content="any description"/>
            </Head>
            <TransitionEffect/>
            <main className='w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light'>
                <Layout className='pt-16'>
                    <AnimatedText text="Знания - сила!" className='mb-16
                    lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8
                    '/>

                    {error && <div className='mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8'>
                        <div className='bg-red-600 text-white text-center rounded-lg p-4 font-semibold'>
                            {JSON.stringify(error)}
                        </div>
                    </div>}

                    <ul className='grid grid-cols-2 gap-16 lg:gap-16 md:grid-cols-1 md:gap-y-16'>

                        {featureArticles.map((article) => (
                            <FeatureArticle
                                key={article.slug}
                                img={article.img}
                                title={article.title}
                                time={article.updated_at}
                                summary={article.summary}
                                link={article.slug}
                            />
                        ))}
                    </ul>

                    {!error && <h2 className='font-bold text-4xl w-full text-center my-16 mt-32'>Все статьи</h2>}

                    <ul>
                        {otherArticles.map((article, index) => (
                            <Article
                                key={article.slug}
                                img={article.img}
                                title={article.title}
                                link={article.slug}
                                date={article.updated_at}
                            />
                        ))}
                    </ul>

                </Layout>
            </main>
        </>
    );
};

export default Articles;

export async function getStaticProps() {
    let articles = []
    let error = null

    try {
        const response = await fetch(`${process.env.BASE_URL}/articles`)
        articles = await response.json()

    } catch (err) {
        console.log('err >>> ', err)
        error = 'Что-то пошло не так...'
    }

    return {
        props: {
            articles,
            error
        }
    }
}