<template>
  <div class="container">
    <HeaderContainer mode="full" />
    <!-- <template v-for="(paragraph, ind) in articleParagraphs">
        <p :key="paragraph" v-html="paragraph" />

      </template> -->

    <v-runtime-template
      class="template-container"
      :template="articleText"
    />
    <article>
      <ObservableEl
        ref="map"
        cell-name="map"
      />
      <ObservableEl
        ref="linechart"
        cell-name="lineChart"
      />
      <ProfileCard
        v-for="(profile,index) in profilesData"
        ref="profiles"
        :key="profile.figure"
        :profile-data="profile"
        :index="index"
      />
      <div class="credits">
        <h4> Credits: </h4>
        <ul>
          <li
            v-for="{key, value} in credits"
            :key="key"
          >
            <strong>{{ key }}:</strong> {{ value }}
          </li>
        </ul>
      </div>
      <ShareContainer />
    </article>
    <FooterContainer />
  </div>
</template>

<script>

import VRuntimeTemplate from 'v-runtime-template'
import CommonUtils from '../mixins/CommonUtils'
import ArticleData from '../data/data.json'
import ObservableEl from '~/components/Custom/ObservableEl'
import HeaderContainer from '~/components/Header/HeaderContainer'
import ShareContainer from '~/components/Custom/ShareContainer'
import FooterContainer from '~/components/Footer/FooterContainer'
import ProfileCard from '~/components/Custom/ProfileCard'

export default {
  components: {
    ObservableEl,
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
    },
    credits () {
      return this.articleData.credits
    }
  },
  watch: {

  },
  mounted () {
    this.$el.querySelector('.map-container').appendChild(this.$refs.map.$el)
    this.$el.querySelector('.linechart-container').appendChild(this.$refs.linechart.$el);

    [...this.$el.querySelectorAll('.profile-container')].forEach((node, id) => {
      node.appendChild(this.$refs.profiles[id].$el)
    })
    const tweetscr = document.createElement('script')
    tweetscr.setAttribute('src', 'https://platform.twitter.com/widgets.js')
    tweetscr.async = true
    const base = document.createElement('base')
    base.setAttribute('target', '_blank')
    document.head.appendChild(tweetscr)
    document.head.appendChild(base)
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
  &:hover {
    background-color: lighten($black, 50%);
  }
}
.profile-container {
  padding-top: 0.5rem;
}
.credits {
  ul {
    margin-left: 0px;
    margin-top: 0px;
    padding-left: 0px;
    list-style: none;
  }
}
</style>
