import Head from 'next/head'
import Layout from "@/components/Layout";
import Image from "next/image";
import profilePic from "../assets/developer-pic-1.png"
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import {LinkArrow} from "@/components/icons";
import HireMe from "@/components/HireMe";
import TransitionEffect from "@/components/TransitionEffect";

export default function Home() {
    return (
        <>
            <Head>
                <title>Portfolio | Home</title>
                <meta name="description" content="Same description"/>
            </Head>
            <TransitionEffect/>
            <main className='flex items-center text-dark w-full min-h-screen dark:text-light'>
                <Layout className='pt-0 md:pt-16 sm:pt-8'>
                    <div className="flex items-center justify-between w-full lg:flex-col">
                        <div className='w-1/2 md:w-full'>
                            <Image src={profilePic} alt="SayMyName"
                                   className='w-full h-auto lg:hidden md:inline-block md:w-full'
                                   priority
                                   sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                            />
                        </div>
                        <div className='w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center'>
                            <AnimatedText text="Уникальные и эффективные решения для ваших задач."
                                          className='!text-6xl !text-left
                    xl: !text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl
                    '/>
                            <p className='my-4 text-base font-medium md:text-sm sm:text-xs'>
                                Я web-разработчик, который умеет превращать идеи в инновационные веб-приложения.
                                Посмотрите мои последние проекты и статьи, демонстрирующие мою компетенцию в
                                веб-разработке.
                                Я увлечен своей работой и готов делиться своими знаниями и опытом с другими.
                            </p>
                            <div className='flex items-center self-start mt-2 lg:self-center'>
                                <Link href="" target={"_blank"}
                                      className="flex items-center bg-dark text-light p-2.5 px-6
                         rounded-lg text-lg font-semibold hover:bg-light hover:text-dark
                         border-2 border-solid border-transparent hover:border-dark
                         dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light
                         hover:dark:border-light md:p-2 md:px-4 md:text-base"
                                      download={true}
                                >Резюме <LinkArrow className={"w-6 ml-1"}/></Link>
                            </div>
                        </div>
                    </div>
                </Layout>
                <HireMe/>
            </main>
        </>
    )
}
