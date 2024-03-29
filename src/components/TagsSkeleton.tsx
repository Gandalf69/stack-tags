import { Skeleton } from '@mui/material'

const TagsSkeleton = () => {
  return (
    <>
        <Skeleton style={{marginBottom: "13px"}} variant="rounded" height={60} />
        <Skeleton variant="rounded" height={360} />
    </>
  )
}

export default TagsSkeleton