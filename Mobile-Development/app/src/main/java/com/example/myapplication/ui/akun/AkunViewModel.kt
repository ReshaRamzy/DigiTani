package com.example.myapplication.ui.akun

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class AkunViewModel : ViewModel() {
    private val _text = MutableLiveData<String>().apply {
        value = "This is Akun Fragment"
    }
    val text : LiveData<String> = _text
}