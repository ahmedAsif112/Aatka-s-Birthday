import SuccessPage from '@/components/Success'
import React, { Suspense } from 'react'

const page = () => {
    return (

        <div >
            <Suspense fallback={<div>Loading...</div>}>
                <SuccessPage />
            </Suspense>

        </div>
    )
}

export default page
