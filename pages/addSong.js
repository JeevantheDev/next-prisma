import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SongAddForm from '../components/SongAddForm';
import { Heading } from '@chakra-ui/core';
const addSong = () => {
  const router = useRouter();
  const [url, setUrl] = useState('');
  useEffect(() => {
    setUrl(window.location.origin);
  }, []);
  console.log(url);
  const handleCreateSong = (song) => {
    fetch(`${url}/api/v1/songs`, {
      method: 'POST',
      body: JSON.stringify({ ...song })
    }).then((res) => {
      router.push('/');
    });
  };
  return (
    <>
      <Heading mt={8} mb={4} fontWeight="800">
        Add Song
      </Heading>
      <SongAddForm handleFormSubmit={handleCreateSong} />
    </>
  );
};

export default addSong;
