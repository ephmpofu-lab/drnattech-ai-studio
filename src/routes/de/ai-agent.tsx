import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/de/ai-agent')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/de/ai-agent"!</div>
}
