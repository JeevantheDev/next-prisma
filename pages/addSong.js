import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SongAddForm from '../components/SongAddForm';
import { Heading, Button, useToast } from '@chakra-ui/core';

const addSong = () => {
  const router = useRouter();
  const toast = useToast();
  const handleCreateSong = (song) => {
    fetch(`/api/v1/songs`, {
      method: 'POST',
      body: JSON.stringify({ ...song })
    }).then((res) => {
      router.push('/');
      toast({
        title: 'New Song Added Successfully.',
        position: 'top',
        status: 'success',
        duration: 9000,
        isClosable: true
      });
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
