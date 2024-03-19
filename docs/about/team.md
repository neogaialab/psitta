---
layout: page
---
<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://www.github.com/luisfuturist.png',
    name: 'Luis Emidio',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/luisfuturist' },
      { icon: 'x', link: 'https://x.com/luisfuturist' }
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Our Team
    </template>
    <template #lead>
      The development of Psitta is guided by an international team, some of whom have chosen to be featured below.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
