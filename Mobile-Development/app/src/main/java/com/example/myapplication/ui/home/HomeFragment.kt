package com.example.myapplication.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.example.myapplication.R

class HomeFragment : Fragment() {
    private lateinit var homeViewModel : HomeViewModel

    override fun onCreateView(
        inflater : LayoutInflater , container : ViewGroup? ,
        savedInstanceState : Bundle?
    ) : View? {
        // Inflate the layout for this fragment
        homeViewModel = ViewModelProvider(this)[HomeViewModel::class.java]
        val root =  inflater.inflate(R.layout.fragment_home , container , false)
        return root
    }

}