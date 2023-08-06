  import { useState, useEffect } from 'react';
  import { useRouter } from 'next/router';
  import { getSelectedAccount } from '@/api/services';
  import axios from 'axios';
  import Image from 'next/image';
  import { parse } from 'url';
  const path = require('path');

  export default function SlugPage() {
    const [data, setData] = useState(null);
    const [fullname, setFullname] = useState(null);
    const [bio, setBio] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [links, setLinks] = useState([]);

    const router = useRouter();
    const { slug } = router.query;

    const fetchData = async () => {
      try {
        const item = await getSelectedAccount(slug);
        setData(item);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      if (slug) {
        fetchData();
      }
    }, [slug]);

    useEffect(() => {
      if (data && data.data && data.data.data && data.data.data[0] && data.data.data[0].attributes) {
        const { fullname, bio, links, photo} = data.data.data[0].attributes;
        setFullname(fullname);
        setBio(bio);
        setPhoto(photo);
        setLinks(links);

        console.log(fullname);
        console.log(bio);
        console.log(photo.data.attributes.url);
        console.log(links);
      }
    }, [data]);

    // If there is no slug, render a custom 404 message
    if (!slug) {
      return <div>Custom 404 Page: Slug not found</div>;
    }

    // Check if data is not available yet, or if it doesn't have the expected structure.
    if (!data || !data.data || !data.data.data || !data.data.data[0] || !data.data.data[0].attributes) {
      return <div>404 Not Found</div>;
    }

    return (
      <main className={`flex max-w-2xl m-auto min-h-screen flex-col items-center p-4 pt-24 `}>
        <div className="flex flex-col items-center gap-2 w-full mb-12">
          {photo?
          <div className="relative w-[150px] h-[150px] rounded-full overflow-hidden mb-4">
                 <img 
                 className="relative"
                 layout="fill"
                 objectFit="cover"
                 src={`http://localhost:1337/uploads/${photo.data.attributes.hash}.jpg`}
                //  alt={data.attributes.fullname}
               />
          </div>
          : null}
          <h3 className="text-2xl font-bold">{fullname}</h3>
          <p className="text-lg">{bio}</p>
        </div>
        <div className="flex flex-col items-center gap-8 w-full">
          {Array.isArray(links.data) && links.data.length > 0 ? (
            links.data.map((link) => (
              <div
                key={link.id}
                className="h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 rounded-[24px] p-4 hover:scale-105 transition-all cursor-pointer"
              >
                <a href={link.attributes.url}>
                  <p>{link.attributes.title}</p>
                </a>
              </div>
            ))
          ) : (
            <div>No links available.</div>
          )}
        </div>
      </main>
    );
  }
