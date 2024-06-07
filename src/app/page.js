"use client"
import createClient from "../client";
import Image from "next/image";
import { useEffect, useState } from "react"; // for fetching data 
import { PortableText } from '@portabletext/react';

export default function Home() {
  const [solutions, setSolutions] = useState([])
  const [casestudies, setCaseStudies] = useState([])
  const [ourpartners, setPartners] = useState([])
  const [news, setNews] = useState([])
  const [articles, setArticles] = useState([])
  const [careers, setCareers] = useState([])

  useEffect(() => {
    createClient
      .fetch(
        `*[_type == "solutions"] {
        title,
        icon {
          asset->{
            _id,
            url
          }
        },
        mainImage{
          asset->{
            _id,
            url
          }
        },
        body,
      }`
      )
      .then((data) => {setSolutions(data)
        
      })
      .catch(console.error)
  }, [])

  useEffect(()=>{
    console.log(solutions, 'length of solutions array')
  },[solutions])

  useEffect(() => {
    createClient
      .fetch(
        `*[_type == "casestudies"] {
        title,
        mainImage{
          asset->{
            _id,
            url
          }
        },
        body,
      }`
      )
      .then((data) => setCaseStudies(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    createClient
      .fetch(
        `*[_type == "ourpartners"] {
          title,
          mainImage{
            asset->{
              _id,
              url
            }
          },
          website
        }`
      )
      .then(data => setPartners(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    createClient
      .fetch(
        `*[_type == "news"] {
        title,
        date,
        description,
      }`
      )
      .then(data => {
        // Format date before setting the state
        const formattedData = data.map(item => ({
          ...item,
          date: new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          })
        }));
        setNews(formattedData);
      })
      .catch(console.error);
  }, [])


  useEffect(() => {
    createClient
      .fetch(
        `*[_type == "articles"] {
        title,
        blogs,
        mainImage{
          asset->{
            _id,
            url
          },
        }
      }`
      )
      .then((data) => setArticles(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    createClient
      .fetch(
        `*[_type == "careers"] {
        title,
        jobRoles,
      }`
      )
      .then((data) => setCareers(data))
      .catch(console.error)
  }, [])

  return (  
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      {solutions.map((solutions) => (
        <>
          <h2 className="border border-dashed border-red-600">{solutions.title}</h2>
          {solutions.icon && solutions.icon.asset && (
            <img src={solutions.icon.asset.url} alt={solutions.title} />
          )}

          {/* {solutions.length!=0?solutions.icon && solutions.icon.asset?<span>may laman</span>:<span>walang laman</span>:<span>walang laman solutions</span>} */}
          {solutions.mainImage && solutions.mainImage.asset && (
            <img src={solutions.mainImage.asset.url} alt={solutions.title} />
          )}
          <PortableText value={solutions.body} />
        </>
      ))}

      {casestudies.map((casestudies) => (
        <>
          <h2 className="border border-dashed border-red-500">{casestudies.title}</h2>
          {casestudies.mainImage && casestudies.mainImage.asset && (
            <img src={casestudies.mainImage.asset.url} alt={casestudies.title} />
          )}
          <PortableText value={casestudies.body} />
        </>
      ))}

      {ourpartners.map((ourpartners) => (
        <>
          <a href={ourpartners.website} target="_blank" rel="noopener noreferrer">
            {ourpartners.mainImage && ourpartners.mainImage.asset && (
              <img src={ourpartners.mainImage.asset.url} alt={ourpartners.title} />
            )}
          </a>
        </>
      ))}

      {news.map((news) => (
        <>
          <h2>{news.title}</h2>
          <p>{news.date}</p>
          <p>{news.description}</p>
        </>
      ))}

      {articles.map((articles) => (
        <>
          <h2>{articles.title}</h2>
          <PortableText value={articles.blogs} />
          <img src={articles.mainImage.asset.url}></img>
        </>
      ))}

      {careers.map((careers) => (
        <>
          <h2>{careers.title}</h2>
          {careers.jobRoles && careers.jobRoles.length > 0 && (
            <p>{careers.jobRoles[0].title}</p>
          )}
        </>
      ))}


    </main>
  );
}
