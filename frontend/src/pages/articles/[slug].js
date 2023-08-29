import React from 'react';
import Head from "next/head";
import TransitionEffect from "@/components/TransitionEffect";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import Image from "next/image";


const HtmlContent = ({html}) => {
    return <div className='w-full mt-16' dangerouslySetInnerHTML={{__html: html}}/>;
};

function Slug({article, error}) {

    return (
        <>
            <Head>
                <title>Portfolio | {article.title}</title>
                <meta name="description" content="any description"/>
            </Head>
            <TransitionEffect/>
            <main className='w-full mb-16 flex flex-col items-center justify-center overflow-hidden dark:text-light'>
                <Layout className='pt-16'>

                    {error ? (<div className='mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8'>
                        <div className='bg-red-600 text-white text-center rounded-lg p-4 font-semibold'>
                            {JSON.stringify(error)}
                        </div>
                    </div>) : (
                        <AnimatedText text={article.title}
                                      className='mb-16 !text-5xl lg:!text-4xl sm:!text-3xl xs:!text-2xl sm:mb-8
                    '/>)}

                    <div className='flex items-center justify-center'>
                        <Image src={'https://res.cloudinary.com/dergr7abg/' + article.img} alt={article.title}
                               height={720}
                               width={1280}/>
                    </div>

                    <HtmlContent html={article.text}/>

                </Layout>
            </main>
        </>
    );
}

export async function getStaticPaths() {


    const response = await fetch(`${process.env.BASE_URL}/articles/`)
    const data = await response.json()

    const allSlugs = data.map(item => item.slug)

    const paths = allSlugs.map(slug => ({params: {slug: slug}}))

    return {
        paths,
        fallback: false
    }
}


export async function getStaticProps({params}) {
    let article = []
    let error = null

    try {
        const response = await fetch(`${process.env.BASE_URL}/articles/${params.slug}`)
        article = await response.json()
    } catch (err) {
        console.log('err >>> ', err)
        error = 'Что-то пошло не так...'
    }

    return {
        props: {
            article,
            error
        }
    }
}

export default Slug