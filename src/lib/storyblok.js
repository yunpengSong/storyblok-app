import Page from "@/components/Page";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Container from "@/components/structure/Container";
import Row from "@/components/structure/Row";
import Col from "@/components/structure/Col";
import Colx from "@/components/structure/Colx";
import Text from "@/components/Text";
import Image from "@/components/Image";
import CardBox from "@/components/CardBox";
import Link from "@/components/LinkComponent";
import Button from "@/components/Button";
import List from "@/components/List";

import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_CONTENT_API_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    login: Login,
    register: Register,
    header: Header,
    footer: Footer,
    banner: Banner,
    container: Container,
    row: Row,
    col: Col,
    colx: Colx,
    text: Text,
    image: Image,
    cardbox: CardBox,
    link: Link,
    button: Button,
    list: List,
    
  },
  apiOptions: {
    region: 'eu',
  },
});