import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/styles/colors'

interface HeaderProps {
    reloadGame: () => void;
    pauseGame: () => void;
    isPaused: boolean;
    children?: React.ReactNode;
}

export default function Header({ reloadGame, pauseGame, isPaused, children }: HeaderProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={reloadGame}>
                <Text style={styles.buttonText}>🔄</Text>
            </TouchableOpacity>
            
            {children}

            <TouchableOpacity onPress={pauseGame}>
                <Text style={styles.buttonText}>{isPaused ? '▶️' : '⏸️'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: Colors.primary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    buttonText: {
        fontSize: 25,
    }
})