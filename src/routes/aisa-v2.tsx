import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/aisa-v2')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/aisa-v2"!</div>
}
