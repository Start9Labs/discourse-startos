import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_2026_10_0_latest_1 } from './v2026.10.0-latest_1'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_2026_10_0_latest_1],
})
