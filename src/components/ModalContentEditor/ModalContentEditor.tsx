import { useRef } from 'react'
import { HeaderForm } from '../HeaderForm/HeaderForm'
import { Button, Input, Modal } from '../ui'
import s from './ModalContentEditor.module.scss'

interface ModalContentEditorProps {
	title: string
	setTitle: React.Dispatch<React.SetStateAction<string>>
	content: string
	setContent: React.Dispatch<React.SetStateAction<string>>
	isOpenModal: boolean
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
	handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleSave: (e: React.MouseEvent<HTMLButtonElement>) => void
	modalTitle: string
	modalSubTitle: string
	showFileUpload?: boolean
}

export const ModalContentEditor = ({
	title,
	setTitle,
	content,
	setContent,
	isOpenModal,
	handleFileChange,
	handleSave,
	modalTitle,
	modalSubTitle,
	setOpenModal,
	showFileUpload = false,
}: ModalContentEditorProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleUploadClick = () => {
		fileInputRef.current?.click()
	}

	return (
		<Modal className={s.contentEditor} isOpen={isOpenModal}>
			<form className={s.form}>
				<HeaderForm
					title={modalTitle}
					subtitle={modalSubTitle}
					onClose={e => {
						e.preventDefault()
						e.stopPropagation()
						setOpenModal(!isOpenModal)
					}}
				/>
				<Input
					label='Your title'
					placeholder='Enter your title'
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
				<Input
					label='Your content'
					placeholder='Enter your content'
					value={content}
					onChange={e => setContent(e.target.value)}
				/>
				{showFileUpload && (
					<>
						<input
							type='file'
							id='fileInput'
							className={s.fileInput}
							onChange={handleFileChange}
							ref={fileInputRef}
						/>
						<Button
							type='disabled'
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								handleUploadClick()
							}}
							newClass={s.uploadButton}
						>
							Upload File
						</Button>
					</>
				)}
				<Button onClick={handleSave}>Save</Button>
			</form>
		</Modal>
	)
}
