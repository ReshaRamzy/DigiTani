package com.example.myapplication.ui.tanaman

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class TanamanViewModel : ViewModel() {
    private val _text = MutableLiveData<String>().apply {
        value = "This is tanaman Fragment"
    }
    val text : LiveData<String> = _text
}