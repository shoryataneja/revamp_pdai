import teamPhoto1    from '@images/team-photo-1.jpg'
import teamPhoto2    from '@images/team-photo-2.jpg'
import teamHQ        from '@images/team-hq.png'
import teamProduct   from '@images/team-product.png'
import culturePhoto1 from '@images/culture-photo-1.jpg'
import culturePhoto2 from '@images/culture-photo-2.jpg'
import culturePhoto3 from '@images/culture-photo-3.jpg'
import culturePhoto4 from '@images/culture-photo-4.jpg'
import culturePhoto5 from '@images/culture-photo-5.jpg'
import culturePhoto6 from '@images/culture-photo-6.jpg'
import culturePhoto7 from '@images/culture-photo-7.jpg'
import culturePhoto8 from '@images/culture-photo-8.jpg'
import culturePhoto9 from '@images/culture-photo-9.jpg'
import culturePhoto10 from '@images/culture-photo-10.jpg'

export const teamGalleryMeta = {
  title: 'The People Behind the Platform',
  intro:
    "A small team with a big mission — building intelligent software that transforms how automotive businesses operate. Here's a glimpse into who we are and how we work.",
}

export const teamTabs = [
  { id: 'culture',   label: 'Team & Culture' },
  { id: 'team',      label: 'Management'     },
  { id: 'workspace', label: 'Workspace'      },
]

/** Team tab — leadership photos only */
export const teamItems = [
  { id: 't1', src: teamHQ,      aspect: 'wide', caption: 'Bengaluru HQ', objectPosition: 'center top' },
  { id: 't2', src: teamProduct, aspect: 'wide', caption: 'Product Team'  },
]

/** Culture tab — all candid & event photos */
export const cultureItems = [
  { id: 'c1',  src: teamPhoto1,    aspect: 'wide',   caption: 'Our Team'              },
  { id: 'c2',  src: teamPhoto2,    aspect: 'wide',   caption: 'Leadership'            },
  { id: 'c3',  src: culturePhoto1, aspect: 'wide',   caption: 'Company Culture'       },
  { id: 'c4',  src: culturePhoto2, aspect: 'tall',   caption: 'Team Moments'          },
  { id: 'c5',  src: culturePhoto3, aspect: 'square', caption: 'Collaboration Session' },
  { id: 'c8',  src: culturePhoto8, aspect: 'wide',   caption: 'Behind the Scenes'     },
  { id: 'c9',  src: culturePhoto9, aspect: 'square', caption: 'Team Hangout'          },
  { id: 'c10', src: culturePhoto10,aspect: 'wide',   caption: 'Building Together'     },
]

/** Workspace tab — office space photos only */
export const workspaceItems = [
  { id: 'w1', src: culturePhoto4, aspect: 'wide',   caption: 'Office Life'    },
  { id: 'w2', src: culturePhoto5, aspect: 'square', caption: 'Our Space'      },
  { id: 'w3', src: culturePhoto6, aspect: 'square', caption: 'Work in Motion' },
  { id: 'w4', src: culturePhoto7, aspect: 'wide',   caption: 'The Studio'     },
]
