import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import TaskTextBox from './TaskTextBox';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarReg } from '@fortawesome/free-regular-svg-icons';
import { addNewCategory, editCategory, deleteCategory } from '../store/category/categorySlice';

const refStarArray = new Array(5).fill(0);

const EditCategoryModel = ({ isModalOpen, setIsModalOpen, categoryDetails }) => {
    const [name, setName] = useState(categoryDetails.name);
    const [description, setDescription] = useState(categoryDetails.description);
    const [priority, setPriority] = useState(categoryDetails.priority);
    const dispatch = useDispatch();

    useEffect(() => {
        setName(categoryDetails.name);
        setDescription(categoryDetails.description);
        setPriority(categoryDetails.priority);
    }, [categoryDetails])

    const onSave = () => {
        // dispatch(addNewCategory({ categoryName: name, categoryDetails: { description, priority } }))
        dispatch(editCategory({ categoryName: categoryDetails.name, categoryDetails: { name, description, priority } }));
        setIsModalOpen(false);
        setName('');
        setDescription('');
        setPriority(1);
    }

    const onDelete = () => {
        dispatch(deleteCategory({ categoryName: categoryDetails.name }))
        setIsModalOpen(false);
        setName('');
        setDescription('');
        setPriority(1);
    }

    const onClose = () => {
        setIsModalOpen(false);
        setName('');
        setDescription('');
        setPriority(1);
    }

    return (
        <View>
            <Modal isVisible={isModalOpen}>
                <View className='px-6 py-8 mx-2 bg-white rounded-3xl'>
                    <View className='flex-row justify-end'>
                        <TouchableOpacity onPress={onClose} className='flex-row items-center justify-center p-2 bg-[#DBD7F2] rounded-full'>
                            <FontAwesomeIcon size={24} color='#230BAF' icon={faClose} />
                        </TouchableOpacity>
                    </View>
                    <Text className='mb-2 text-black'>Category name</Text>
                    <TaskTextBox value={name} setValue={setName} isMultiline={false} />

                    <Text className='mt-4 mb-2 text-black'>Category Description</Text>
                    <TaskTextBox value={description} setValue={setDescription} isMultiline={true} />

                    <Text className='mt-4 mb-2 text-black'>Category Priority</Text>
                    <View className='flex-row justify-between'>
                        {refStarArray.map((_, key) => <TouchableOpacity key={key} onPress={() => setPriority(key + 1)}>
                            <FontAwesomeIcon size={24} color={priority > key ? '#EEBA00' : 'black'} icon={priority > key ? faStar : faStarReg} />
                        </TouchableOpacity>)}
                    </View>

                    <View className='flex-row justify-between mt-8'>
                        <TouchableOpacity onPress={onDelete} className='items-center justify-center w-[48%] p-4 bg-red-400 rounded-lg'>
                            <Text className='text-white'>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onSave} className='items-center justify-center w-[48%] p-4 bg-[#26252C] rounded-lg'>
                            <Text className='text-white'>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default EditCategoryModel