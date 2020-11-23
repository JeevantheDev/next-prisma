import { PrismaClient } from '@prisma/client';
import { List, Heading, Select, Box, Button, Flex } from '@chakra-ui/core';
import { IconButton, Spacer, Tooltip } from '@chakra-ui/react';
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';

import Song from '../components/Song';
import AddBtn from '../components/AddBtn';
import { useState } from 'react';

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const songs = await prisma.song.findMany({
    include: { Artist: true }
  });

  return {
    props: {
      songs
    }
  };
}
const ListSongs = ({ songs }) => (
  <List>
    {songs.map((song) => (
      <Song key={song.id} {...song} />
    ))}
  </List>
);
const Home = (props) => {
  const { songs } = props;
  const [category, setCategory] = useState('all');
  const [reverse, setReverse] = useState(false);
  const handleFilterChange = (event) => {
    const { options } = event.target;
    const optionsLength = options.length;
    let value = [];

    for (let i = 0; i < optionsLength; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setCategory(value.toString());
  };

  const handleUp = () => {
    setReverse(!reverse);
  };

  const filterSongs = (songs) => {
    if (category === 'all') {
      if (reverse) {
        return songs.reverse();
      } else {
        return songs.reverse();
      }
    } else {
      if (reverse) {
        return songs.reverse().filter((song) => {
          return (
            song.Artist.genre.toLowerCase() &&
            song.Artist.genre.toLowerCase().includes(category)
          );
        });
      } else {
        return songs.reverse().filter((song) => {
          return (
            song.Artist.genre.toLowerCase() &&
            song.Artist.genre.toLowerCase().includes(category)
          );
        });
      }
    }
  };

  return (
    <>
      <Heading mt={8} mb={4} fontWeight="800">
        All Songs
      </Heading>
      <AddBtn>
        <Box w="100%">
          <Select
            onChange={handleFilterChange}
            mx="2"
            my="4"
            variant="filled"
            placeholder="Filter By Category"
          >
            <option value="all">All</option>
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
        </Box>
        <Box w="20%" ml="4">
          <Flex>
            <Spacer />
            <Tooltip
              label="Sort"
              placement="top"
              aria-label="A tooltip"
              bg="grey.600"
            >
              <Button p="4" onClick={handleUp} w="10%" my="4">
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  size="lg"
                  aria-label="New Songs"
                  icon={<ArrowUpIcon />}
                />
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  size="lg"
                  aria-label="New Songs"
                  icon={<ArrowDownIcon />}
                />
              </Button>
            </Tooltip>
          </Flex>
        </Box>
      </AddBtn>

      <ListSongs songs={filterSongs(songs)} />
    </>
  );
};

export default Home;
