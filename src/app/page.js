"use client"
import createClient  from "../client";
import Image from "next/image";
import { useEffect, useState} from "react"; // for fetching data 

export default function Home() {
  const [careers, setCareers] = useState([])

  useEffect(() => {
    createClient
      .fetch(
        `*[_type == "careers"] {
        title,
        jobRole,
      }`
      )
      .then((data) => setCareers(data))
      .catch(console.error)
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
  {careers.map((careers) => (
        <>
              <h2>{careers.title}</h2>
              <p>{careers.jobRole}</p>
        </>
          ))}
    </main>
  );
}
