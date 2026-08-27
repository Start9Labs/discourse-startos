import { storeJson } from '../fileModels/store.json'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  workers: Value.number({
    name: i18n('Web Workers'),
    description: i18n(
      'How many requests Discourse serves at once. Each worker costs roughly 250 MB of memory; one is enough for a small community, and a busy forum on a machine with memory to spare benefits from more.',
    ),
    required: true,
    default: 1,
    min: 1,
    max: 8,
    step: 1,
    integer: true,
    units: 'workers',
  }),
})

export const setWorkerCount = sdk.Action.withInput(
  'set-worker-count',

  async () => ({
    name: i18n('Set Worker Count'),
    description: i18n(
      'Trade memory for concurrency. Discourse restarts to apply the change.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async () => ({
    workers:
      (await storeJson.read((s) => s.unicornWorkers).once()) ?? undefined,
  }),

  async ({ effects, input }) =>
    storeJson.merge(effects, { unicornWorkers: input.workers }),
)
