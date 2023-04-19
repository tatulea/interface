import Column from 'components/Column'
import Row from 'components/Row'
import styled from 'styled-components/macro'
import { BREAKPOINTS } from 'theme'

import { DataPageDescription } from './DataPageDescription'
import { DataPageHeader } from './DataPageHeader'
import { DataPageTable } from './DataPageTable'
import { DataPageTraits } from './DataPageTraits'

const DataPageContainer = styled(Column)`
  padding: 24px 120px;
  height: 100vh;
  width: 100%;
  gap: 36px;
`

const ContentContainer = styled(Row)`
  gap: 24px;
  padding-bottom: 45px;

  @media screen and (max-width: ${BREAKPOINTS.lg}px) {
    flex-wrap: wrap;
  }
`

const LeftColumn = styled(Column)`
  gap: 24px;
  width: 100%;
`

// TODO remove
// eslint-disable-next-line import/no-unused-modules
export const DataPage = () => {
  return (
    <DataPageContainer>
      <DataPageHeader />
      <ContentContainer>
        <LeftColumn>
          <DataPageTraits />
          <DataPageDescription />
        </LeftColumn>
        <DataPageTable />
      </ContentContainer>
    </DataPageContainer>
  )
}
