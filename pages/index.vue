<template>
  <div class="container">
    <HeaderContainer />
    <!-- <template v-for="(paragraph, ind) in articleParagraphs">
        <p :key="paragraph" v-html="paragraph" />

      </template> -->

    <v-runtime-template :template="articleText" />
    <article>
      <MapContainer />
      <ProfileCard
        v-for="profile in profilesData"
        ref="profiles"
        :key="profile.figure"
        :profile-data="profile"
      />
    </article>
    <ShareContainer />
    <RelatedPostsContainer />
    <FooterContainer />
  </div>
</template>

<script>

import VRuntimeTemplate from 'v-runtime-template'
import CommonUtils from '../mixins/CommonUtils'
import ArticleData from '../data/data.json'
import RelatedPostsContainer from '~/components/RelatedPosts/RelatedPostsContainer'
import MapContainer from '~/components/Map/MapContainer'
import HeaderContainer from '~/components/Header/HeaderContainer'
import ShareContainer from '~/components/Custom/ShareContainer'
import FooterContainer from '~/components/Footer/FooterContainer'
import ProfileCard from '~/components/Custom/ProfileCard'

export default {
  components: {
    RelatedPostsContainer,
    MapContainer,
    HeaderContainer,
    ShareContainer,
    FooterContainer,
    ProfileCard,
    VRuntimeTemplate
  },
  mixins: [
    CommonUtils
  ],
  asyncData (ctx) {
    return {
      articleData: ArticleData.content
    }
  },
  data () {
    return {
    }
  },
  computed: {
    articleText () {
      return `<article>${this.articleData.text}</article>`
      // regex match all paragraphs, return only inner content
      // return [...this.articleData.text.matchAll(/<p>(.+?)<\/p>/g)].map(s => s[1])
    },
    profilesData () {
      return this.articleData.cases
    }
  },
  watch: {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="scss">
@import "~@/css/vars";
@import "~@/css/base";

a {
  border-bottom-color: $black;
  &:hover{
    background-color: lighten($black, 50%);
  }
}
</style>
