<template>
  <div class="container">
    <HeaderContainer />
    <article>
      <template v-for="(paragraph,ind) in articleParagraphs">
        <p :key="paragraph" v-html="paragraph" />
        <MapContainer v-if="ind === 3" :key="paragraph + ind" />
      </template>
    </article>
    <ShareContainer />
    <RelatedPostsContainer />
    <FooterContainer />
  </div>
</template>

<script>

import CommonUtils from '../mixins/CommonUtils'
import ArticleData from '../data/data.json'
import RelatedPostsContainer from '~/components/RelatedPosts/RelatedPostsContainer'
import MapContainer from '~/components/Map/MapContainer'
import HeaderContainer from '~/components/Header/HeaderContainer'
import ShareContainer from '~/components/custom/ShareContainer'
import FooterContainer from '~/components/Footer/FooterContainer'

export default {
  components: {
    RelatedPostsContainer,
    MapContainer,
    HeaderContainer,
    ShareContainer,
    FooterContainer
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
    articleParagraphs () {
      // regex match all paragraphs, return only inner content
      return [...this.articleData.text.matchAll(/<p>(.+?)<\/p>/g)].map(s => s[1])
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

<style lang="scss" scoped>
@import "~@/css/vars";
@import "~@/css/base";
</style>
