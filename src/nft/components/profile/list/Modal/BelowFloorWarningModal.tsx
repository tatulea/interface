import { msg, Plural, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ButtonPrimary } from 'components/Button'
import Column from 'components/Column'
import { Portal } from 'nft/components/common/Portal'
import { Overlay } from 'nft/components/modals/Overlay'
import { Listing, WalletAsset } from 'nft/types'
import React from 'react'
import { AlertTriangle, X } from 'react-feather'
import styled, { useTheme } from 'styled-components'
import { BREAKPOINTS } from 'theme'
import { ThemedText } from 'theme/components'
import { Z_INDEX } from 'theme/zIndex'
import { useFormatter } from 'utils/formatNumbers'

const ModalWrapper = styled(Column)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  z-index: ${Z_INDEX.modal};
  background: ${({ theme }) => theme.surface1};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.surface3};
  box-shadow: ${({ theme }) => theme.deprecated_deepShadow};
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media screen and (max-width: ${BREAKPOINTS.sm}px) {
    width: 100%;
  }
`
const CloseIconWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`
const CloseIcon = styled(X)`
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`

const HazardIconWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 32px 120px;
`

const ContinueButton = styled(ButtonPrimary)`
  font-weight: 535;
  font-size: 20px;
  line-height: 24px;
  margin-top: 12px;
`

const EditListings = styled.span`
  font-weight: 535;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.accent1};
  text-align: center;
  cursor: pointer;
  padding: 12px 16px;

  &:hover {
    opacity: 0.6;
  }
`

export const BelowFloorWarningModal = ({
  listingsBelowFloor,
  closeModal,
  startListing,
}: {
  listingsBelowFloor: [WalletAsset, Listing][]
  closeModal: () => void
  startListing: () => void
}) => {
  const theme = useTheme()
  const { _ } = useLingui()
  const { formatDelta } = useFormatter()
  const clickContinue = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    startListing()
    closeModal()
  }
  return (
    <Portal>
      <ModalWrapper>
        <CloseIconWrapper>
          <CloseIcon width={24} height={24} onClick={closeModal} />{' '}
        </CloseIconWrapper>
        <HazardIconWrap>
          <AlertTriangle height={90} width={90} color={theme.critical} />
        </HazardIconWrap>
        <ThemedText.HeadlineSmall lineHeight="28px" textAlign="center">
          <Trans>Low listing price</Trans>
        </ThemedText.HeadlineSmall>
        <ThemedText.BodyPrimary textAlign="center">
          <Plural
            value={listingsBelowFloor.length !== 1 ? 2 : 1}
            _1={_(
              msg`One NFT is listed ${formatDelta(
                (1 - (listingsBelowFloor[0][1].price ?? 0) / (listingsBelowFloor[0][0].floorPrice ?? 0)) * 100
              )} `
            )}
            other={_(msg`${listingsBelowFloor.length} NFTs are listed significantly `)}
          />
          &nbsp;
          <Trans>below the collection’s floor price. Are you sure you want to continue?</Trans>
        </ThemedText.BodyPrimary>
        <ContinueButton onClick={clickContinue}>
          <Trans>Continue</Trans>
        </ContinueButton>
        <EditListings onClick={closeModal}>
          <Trans>Edit listings</Trans>
        </EditListings>
      </ModalWrapper>
      <Overlay onClick={closeModal} />
    </Portal>
  )
}
