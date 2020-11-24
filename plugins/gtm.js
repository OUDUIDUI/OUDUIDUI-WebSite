import env from '@/utils/env'

export default function({ $gtm, route }) {
  $gtm.init(env.GOOGLE_TAG_MANAGER_ID)
}
