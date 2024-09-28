import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';


const FillJob = ({ navigation }) => {
    const [jobType, setJobType] = useState('');
    const [location, setLocation] = useState('');
    const [experience, setExperience] = useState('');
    const [salary, setSalary] = useState('');
    const [eligibility, setEligibility] = useState('');
    const [industryType, setIndustryType] = useState('');
    const [functionalArea, setFunctionalArea] = useState('');
    const [skills, setSkills] = useState('');

    const handleSubmit = async () => {
        const jobData = {
            job_type: jobType,
            location: location,
            experience: experience,
            salary: salary,
            eligibility: eligibility,
            industry_type: industryType,
            functional_area: functionalArea,
            skills: skills
        };
    
        try {
            const response = await fetch('http://10.0.2.2:5000/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jobData)
            });
    
            if (!response.ok) {
                // Get the response text for more details
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
            }
    
            const data = await response.json();
            Alert.alert('Success', 'Job posted successfully');
            navigation.navigate('Home');
    
        } catch (error) {
            Alert.alert('Error', 'An error occurred while posting the job');
            console.error('Error:', error);
        }
    };
    

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.label}>Job Type:</Text>
                <TextInput
                    style={styles.input}
                    value={jobType}
                    onChangeText={setJobType}
                />

                <Text style={styles.label}>Location:</Text>
                <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                />

                <Text style={styles.label}>Experience:</Text>
                <TextInput
                    style={styles.input}
                    value={experience}
                    onChangeText={setExperience}
                />

                <Text style={styles.label}>Salary:</Text>
                <TextInput
                    style={styles.input}
                    value={salary}
                    onChangeText={setSalary}
                />

                <Text style={styles.label}>Eligibility:</Text>
                <TextInput
                    style={styles.input}
                    value={eligibility}
                    onChangeText={setEligibility}
                />

                <Text style={styles.label}>Industry Type:</Text>
                <TextInput
                    style={styles.input}
                    value={industryType}
                    onChangeText={setIndustryType}
                />

                <Text style={styles.label}>Functional Area:</Text>
                <TextInput
                    style={styles.input}
                    value={functionalArea}
                    onChangeText={setFunctionalArea}
                />

                <Text style={styles.label}>Skills:</Text>
                <TextInput
                    style={styles.input}
                    value={skills}
                    onChangeText={setSkills}
                />

                <Button
                    title="Submit"
                    onPress={handleSubmit}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        padding: 8,
        borderRadius: 5
    }
});

export default FillJob;
