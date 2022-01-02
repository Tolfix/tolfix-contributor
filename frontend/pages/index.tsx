import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { SplitText } from '../components/SplitText';

const Home: NextPage = () => {

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting);
        if(entry.isIntersecting) observer.unobserve(entry.target);
      })
    }, {
      threshold: 0
    })
    const allElements = document.querySelectorAll('.elementE');
    if(allElements)
    {
      allElements.forEach((element) => {
        observer.observe(element)
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>Tolfix | Contribution</title>
        <meta name="description" content="Tolfix contribution program, information found here. Tolfix" />
        <link rel="icon" href="https://cdn.tolfix.com/images/TX-Small.png" />
      </Head>

      <main className='container mx-auto'>
        <header id='headerMain' className='flex flex-col justify-center text-center elementE'>
          <img
            className='w-1/2 mx-auto' 
            src="https://cdn.tolfix.com/images/Tolfix.png"
            alt="Tolfix Logo"
          />
          <div>
            <h1 className='text-2xl sm:text-4xl font-bold'>
              {/* @ts-ignore */}
              <span className='text-green'>Tolfix</span> represents the <SplitText copy="Contribution Program" role="heading"/>
            </h1>
          </div>
        </header>

        <section className='mt-10'>
          {/* All of our content about the program */}
          <div id='a1' className='elementE text-center sm:text-left px-5 sm:px-0'>
            <h2 className='text-3xl text-green'>
              What is the contribution program?
            </h2>
            <div className='space-y-8 columns-2xs gap-x-12 mt-5'>
              <p>
                The contribution program is a way for us to receive help from contributors around the globe and reward them for their help in its growth. By joining you'll be part of a community of contributors of Tolfix.
              </p>
            </div>
          </div>

          <div id='a2' className='mt-10 elementE text-center sm:text-left px-5 sm:px-0'>
            <h2 className='text-3xl text-green'>
              How does it work?
            </h2>
            <div className='space-y-8 columns-2xs gap-x-12 mt-5'>
              <p>
                When you join the program, our systems will keep track of your progress. It will track your contributions to our repositories and services then calculate them to determine your reward.
              </p>
            </div>
          </div>

          <div id='a3' className='mt-10 elementE text-center sm:text-left px-5 sm:px-0'>
            <h2 className='text-3xl text-green'>
              What do I earn from it?
            </h2>
            <div className='space-y-8 columns-2xs gap-x-12 mt-5'>
              <p>
                Depending on how much you contribute you earn various of <span className='italic'>items</span> which can be the following.
                <ul className='px-5 list-none sm:list-disc'>
                  <li>Servers</li>
                  <li>Gift Cards</li>
                  <li>Hosting</li>
                  <li>Perks</li>
                  <li>Access to private servers</li>
                </ul>
              </p>
              <p>
                You'll receive notifications from our system when you unlock access to a new award. Once you've hit the required the level of contribution experience.
              </p>
            </div>
          </div>

          <div id='a4'  className='mt-10 elementE text-center sm:text-left px-5 sm:px-0'>
            <h2 className='text-3xl text-green'>
              How do I get involved?
            </h2>
            <div className='space-y-8 gap-x-12 mt-5'>
              <p>
                You can join for free by clicking on the button bellow.
                <div className='mt-5'>
                  <a className='
                    btn-green 
                    disabled:hover:cursor-not-allowed
                    
                    '
                    href='/join'
                  >
                    Join Contribution Program
                  </a>
                </div>
              </p>
            </div>
          </div>

          <div id='a5' className='mt-10 elementE text-center sm:text-left px-5 sm:px-0'>
            <h2 className='text-3xl text-green'>
              What counts as a contribution?
            </h2>
            <div className='space-y-8 columns-2xs gap-x-12 mt-5'>
              <p>
                Anyone who has joined the Contribution Program gets experience for their contributions. Thus you can earn experience various of ways.
              </p>
              <p>
                Here is a list of ways you can contribute.
                <div>
                  <ul className='px-5 list-none sm:list-disc'>
                    <li>
                      <span className='font-bold'>Commits</span>
                      <p>
                        You can contribute by making commits to our repositories.
                      </p>
                    </li>
                    <li>
                      <span className='font-bold'>Pull Requests</span>
                      <p>
                        You can contribute by making pull requests to our repositories.
                      </p>
                    </li>
                    <li>
                      <span className='font-bold'>Issues</span>
                      <p>
                        You can contribute by making issues to our repositories.
                      </p>
                    </li>
                    <li>
                      <span className='font-bold'>Forks</span>
                      <p>
                        You can contribute by forking our repositories.
                      </p>
                    </li>
                    <li>
                      <span className='font-bold'>Starred Repositories</span>
                      <p>
                        You can contribute by starring our repositories.
                      </p>
                    </li>
                    <li>
                      <span className='font-bold'>Following</span>
                      <p>
                        You can contribute by following our members.
                      </p>
                    </li>
                  </ul>
                </div>
              </p>
              <p>
                All of these gives you some amount of experience. Some are automated and gives a very small experience. Some are not automated and gives a large experience, which gets handled by our administrators, and these can be by helping the community.
              </p>
            </div>
          </div>

          <div id='a5' className='mt-10 elementE text-center sm:text-left px-5 sm:px-0'>
            <h2 className='text-3xl text-green'>
              How does Tolfix earn from it?
            </h2>
            <div className='space-y-8 columns-2xs gap-x-12 mt-5'>
              <p>
                We earn no money from this. We only receive a trustworthy community of people who are willing to help us grow.
              </p>
            </div>
          </div>

        </section>

      </main>
    </>
  )
}

export default Home