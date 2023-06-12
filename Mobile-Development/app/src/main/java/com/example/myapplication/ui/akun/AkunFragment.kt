package com.example.myapplication.ui.akun

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import com.example.myapplication.R

class AkunFragment : Fragment() {
    private lateinit var akunViewModel : AkunViewModel

    override fun onCreateView(
        inflater : LayoutInflater , container : ViewGroup? ,
        savedInstanceState : Bundle?
    ) : View? {
        // Inflate the layout for this fragment
        akunViewModel = ViewModelProvider(this)[AkunViewModel::class.java]
        val root =  inflater.inflate(R.layout.fragment_akun , container , false)

        val textView: TextView = root.findViewById(R.id.textAkun)
        akunViewModel.text.observe(viewLifecycleOwner) {
            textView.text = it
        }
        return root
    }
}