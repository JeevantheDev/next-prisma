import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  Select,
  useToast
} from '@chakra-ui/core';
import NextLink from 'next/link';

const SongAddForm = (props) => {
  const { handleFormSubmit } = props;
  const toast = useToast();
  const state = {
    songName: '',
    youtubeId: '',
    albumCover: '',
    artistName: '',
    genre: ''
  };
  const [form, setForm] = useState(state);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    setForm({
      ...form,
      [name]: target.value
    });
  };
  const handleYoutubeIdChange = (e) => {
    const target = e.target.value;
    const videoId = getId(target);
    setForm({ ...form, youtubeId: videoId });
  };
  const handleGenreChange = (event) => {
    const { options } = event.target;
    const optionsLength = options.length;
    let value = [];

    for (let i = 0; i < optionsLength; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setForm({
      ...form,
      genre: value.toString()
    });
  };
  const getId = (url) => {
    var video_id = url.split('v=')[1];

    return video_id;
  };
  const handleSubmit = () => {
    if (
      form.albumCover &&
      form.artistName &&
      form.genre &&
      form.songName &&
      form.youtubeId
    ) {
      handleFormSubmit({ ...form });
      setLoading(true);
      setForm({
        songName: '',
        artistName: '',
        youtubeId: '',
        genre: '',
        albumCover: ''
      });
    } else {
      toast({
        title: 'Fill all the area.',
        position: 'top',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };
  return (
    <>
      <FormControl id="songName">
        <FormLabel>Song name</FormLabel>
        <Input onChange={handleChange} name="songName" type="text" />
      </FormControl>
      <FormControl id="youtubeId">
        <FormLabel>Youtube URL</FormLabel>
        <Input onChange={handleYoutubeIdChange} type="text" />
      </FormControl>
      <FormControl id="albumCover">
        <FormLabel>Album Cover URL</FormLabel>
        <Input onChange={handleChange} name="albumCover" type="text" />
      </FormControl>
      <FormControl id="artistName">
        <FormLabel>Artist name</FormLabel>
        <Input onChange={handleChange} name="artistName" type="text" />
      </FormControl>
      <FormControl id="genre">
        <FormLabel>Genre</FormLabel>
        <Select
          variant="filled"
          onChange={handleGenreChange}
          placeholder="Select option"
        >
          <option value="rock">Rock</option>
          <option value="pop">Pop</option>
          <option value="hip-hop">Hip-Hop</option>
          <option value="alternative">Alternative</option>
          <option value="r&b">R&B</option>
          <option value="edm">Electronic Dance Music</option>
          <option value="jazz">Jazz</option>
          <option value="country_music">Country Music</option>
          <option value="electro">Electro</option>
          <option value="punjabi">Punjabi</option>
        </Select>
      </FormControl>
      <Flex>
        <NextLink href="/" passHref>
          <Button as="a" my={4} leftIcon="arrow-back">
            Back
          </Button>
        </NextLink>
        {!loading ? (
          <Button onClick={handleSubmit} mx="4" my="4">
            Submit
          </Button>
        ) : (
          <Button isLoading loadingText="Submitting" mx="4" my="4">
            Submit
          </Button>
        )}
      </Flex>
    </>
  );
};

export default SongAddForm;
