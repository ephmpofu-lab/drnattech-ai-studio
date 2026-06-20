import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/de/frameworks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/de/frameworks"!</div>
}
